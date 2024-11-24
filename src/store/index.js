import { createStore } from 'vuex';
import api from '@/api';

export default createStore({
    state:     {},
    getters:   {},
    mutations: {},
    actions:   {
        async login({ commit }, { email, password }) {
            try {
                const request = {
                    email,
                    password,
                };
                const { data } = await api.auth(request);
                console.log(data);
            }
            catch (error) {
                console.error(error);
                return { error: error?.response?.data?.message || [] };
            }
        },
    },
    modules:   {},
});
