import Vue from 'vue';
import axios from 'axios';
import { userKey, baseApiUrl } from '@/global';

// Configura a URL base para todas as requisições
axios.defaults.baseURL = baseApiUrl;

// Interceptor de requisição para adicionar o token JWT
axios.interceptors.request.use(config => {
  const json = localStorage.getItem(userKey);
  const userData = JSON.parse(json);
  if (userData && userData.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor de resposta para tratar erros
const success = res => res;
const error = err => {
  if (err.response && err.response.status === 401) {
    localStorage.removeItem(userKey); // Remove o token inválido
    window.location = '/auth'; // Redireciona para a página de autenticação
  } else {
    return Promise.reject(err);
  }
};

axios.interceptors.response.use(success, error);

// Registra o Axios como um plugin do Vue
Vue.prototype.$http = axios;

export default axios;