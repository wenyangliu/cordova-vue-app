import Vue from 'vue'
import App from './App.vue'
import VueCordova from 'vue-cordova'

Vue.config.productionTip = false

Vue.use(VueCordova)

if (window.location.protocol === 'file:' || window.location.port === '8080') {
  let cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

Vue.cordova.on('deviceready', () => {
  console.log('Cordova : device is ready !')
  console.log('Vue.cordova :', Vue.cordova)
})

new Vue({
  render: h => h(App)
}).$mount('#app')
