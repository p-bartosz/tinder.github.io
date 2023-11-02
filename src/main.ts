import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// import store from './store'
import VueGoogleMaps from '@fawmi/vue-google-maps'

import "./main.scss";

createApp(App)
// .use(store)
.use(router)
.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyCUoAC4ugfopIxNmy1KiqdxDpMHhdTtx74',
  },
})
.mount('#app')
