import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.prototype.$ld = require('lodash')

window.moment = require('moment')
require('moment/locale/es')

Vue.filter('formatDateTime', (value) => {
  if (!value) return ''
  return window.moment(value, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm')
})

require('animate.css/animate.css')
