import axios from 'axios';

axios.defaults.baseURL = 'https://dist.nd.ru/';

function auth(request) {
   return axios.post('/api/auth', request)
}

function register(request) {
   return axios.post('/api/reg', request)
}

function getInfo() {
   return axios.get('/api/auth')
}

function logout() {
   return axios.delete('/api/auth')
}

function getNotes() {
   return axios.get('/api/notes')
}

function createNotes() {
   return axios.post('/api/notes')
}

function deleteNotes(id) {
   return axios.delete(`/api/notes/${id}`)
}


export default {
   auth,
   register,
   getInfo,
   logout,
   getNotes,
   createNotes,
   deleteNotes,
}