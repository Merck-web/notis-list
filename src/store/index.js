import { createStore } from 'vuex';
import api from '@/api';
import axios from 'axios';

export default createStore({
    state:     {
        personalInfo: {},
    },
    getters:   {
        isAuth: state => Object.keys(state.personalInfo).length,
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
        },
        
        SET_PERSONAL_DATA: (state, payload) => {
            state.personalInfo = payload
        },
    },
    actions:   {
        setToken({ commit }, token) {
            commit('SET_TOKEN', token || '');
        },
        
        async login({ commit, dispatch }, { email, password }) {
            try {
                const request = {
                    email,
                    password,
                };
                const { data } = await api.auth(request);
                
                commit('SET_TOKEN', data?.accessToken || '');
                
                dispatch('getInfo');
                
                return data;
            }
            catch (error) {
                console.error(error);
                return { error: error?.response?.data?.message || [] };
            }
        },
        
        async register({ commit }, { email, password, confirm_password }) {
            try {
                const request = {
                    email,
                    password,
                    confirm_password,
                };
                const { data } = await api.register(request);
                
                return data;
            }
            catch (error) {
                console.error(error);
                return { error: error?.response?.data?.message || [] };
            }
        },
        
        async getInfo({ commit }) {
            try {
                const { data } = await api.getInfo();
                commit('SET_PERSONAL_DATA', data);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        },
    },
    modules:   {},
});
