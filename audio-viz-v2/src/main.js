// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


// https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode
// https://egghead.io/lessons/javascript-intro-to-the-web-audio-api

//Audio Sampling
// http://js.do/blog/sound-waves-with-javascript/
// https://en.wikipedia.org/wiki/Sampling_(signal_processing)
// https://www.html5rocks.com/en/tutorials/webaudio/intro/
