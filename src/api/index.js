import axios from 'axios';

axios.defaults.baseURL = 'https://dist.nd.ru/';

function auth(request) {
   return axios.post('/api/auth', request)
}

function register(request) {
   return axios.post('/api/reg', request)
}


export default {
   auth,
   register,
}