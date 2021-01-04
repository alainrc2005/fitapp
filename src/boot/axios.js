import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { LocalStorage } from 'quasar'

const axiosContext = axios.create({ withCredentials: true })

axiosContext.interceptors.response.use(response => {
  if (response.data.code === 'session timeout') {
    LocalStorage.remove('token')
    LocalStorage.remove('userid')
    window.$router.push({ name: 'login' })
    return
  }
  return response
}, error => {
  if (error.response && (error.response.status === 419 || error.response.status === 401)) {
    LocalStorage.remove('token')
    LocalStorage.remove('userid')
    window.$router.push({ name: 'login' })
    return
  }
  return Promise.reject(error)
})

axiosContext.interceptors.request.use(config => {
  config.baseURL = LocalStorage.getItem('url') || ''
  if (LocalStorage.has('token')) {
    config.headers.Authorization = 'Bearer ' + LocalStorage.getItem('token')
  }
  return config
})

Vue.prototype.$axios = axiosContext
Vuex.Store.prototype.$axios = axiosContext
