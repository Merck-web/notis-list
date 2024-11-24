import axios from 'axios';

axios.defaults.baseURL = 'https://dist.nd.ru/';

function auth(request) {
   return axios.post('/api/auth', request)
}


export default {
   auth,
}