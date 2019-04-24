// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import jQuery from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'adminlte/dist/css/AdminLTE.min.css'
import 'adminlte/dist/css/skins/skin-blue.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css'
import Bootstrap from 'bootstrap'
import BootstrapTable from 'bootstrap-table'
import AdminLte from 'adminlte'
import datepicker from 'bootstrap-datepicker'
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App'
import router from './router'

import VueI18n from 'vue-i18n'
import messages from '@/components/i18n'
import dateTimeFormats from '@/components/i18n/datetimeformats'
import {getCookie, delCookie} from '@/components/utils/cookie'
import tableToExcel from '@/components/utils/tableToExcel'
import tableToExcel2 from '@/components/utils/tableToExcel2'
import htmlToPdf from '@/components/utils/htmlToPdf'

Vue.config.productionTip = false
console.log('>>> main.js')
window.jQuery = jQuery
console.log(window)

var lang = getCookie('lang')
console.log('lang = ' + lang)
if (!lang || lang === '') {
  lang = 'zh_CN'
}
if (lang === 'zh') {
  lang = 'zh_CN'
}
delCookie('currentDate')

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(tableToExcel)
Vue.use(tableToExcel2)
Vue.use(ElementUI)
Vue.use(htmlToPdf)
const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: 'en',
  messages,
  dateTimeFormats
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: {App, jQuery, Bootstrap, BootstrapTable, AdminLte, datepicker},
  data: {
    eventHub: new Vue()
  }
})
