import { createStore } from 'vuex';
import api from '@/api';
import axios from 'axios';

export default createStore({
    state:     {},
    getters:   {},
    mutations: {
        SET_TOKEN: (state, token) => {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
        },
    },
    actions:   {
        setToken({ commit }, token) {
            commit('SET_TOKEN', token || '');
        },
        
        async login({ commit }, { email, password }) {
            try {
                const request = {
                    email,
                    password,
                };
                const { data } = await api.auth(request);
                
                commit('SET_TOKEN', data?.accessToken || '');
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
    },
    modules:   {},
});
