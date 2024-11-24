import { createStore } from 'vuex';
import api from '@/api';
import axios from 'axios';

export default createStore({
    state:     {
        personalInfo: {},
        notesList:    [],
    },
    getters:   {
        isAuth: state => Object.keys(state.personalInfo).length,
        
        getPersonalInfo: state => state.personalInfo,
        
        getNotesList: state => state.notesList,
    },
    mutations: {
        LOGOUT: (state) => {
            state.personalInfo = {};
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';
        },
        
        SET_TOKEN: (state, token) => {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
        },
        
        SET_PERSONAL_DATA: (state, payload) => {
            state.personalInfo = payload;
        },
        
        ADD_IN_NOTES_LIST: (state, payload) => state.notesList.push(payload),
        
        SET_NOTES_LIST: (state, payload) => state.notesList = payload,
        
        REMOVE_BY_INDEX_NOTES_ITEM: (state, index) => state.notesList.splice(index, 1),
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
                dispatch('getNotes');
                
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
        
        async getNotes({ commit }) {
            try {
                const { data } = await api.getNotes();
                commit('SET_NOTES_LIST', data);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        },
        
        async createNotes({ commit }, payload) {
            try {
                const { data } = await api.createNotes({ ...payload });
                commit('ADD_IN_NOTES_LIST', data);
                return data;
            }
            catch (error) {
                console.error(error);
                return { error: error?.response?.data?.message || [] };
            }
        },
        
        async deleteNotes({ commit }, { id, index }) {
            try {
                await api.deleteNotes(id);
                commit('REMOVE_BY_INDEX_NOTES_ITEM', index);
            }
            catch (error) {
                console.error(error);
                return { error: error?.response?.data?.message || [] };
            }
        },
        
        async logout({ commit }) {
            try {
                const { data } = await api.logout();
                console.log(data);
                commit('LOGOUT');
                return data;
            }
            catch (error) {
                console.error(error);
            }
        },
    },
    modules:   {},
});
