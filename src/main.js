

import Vue from 'vue'
import App from './App.vue'
import ChooseTicket from './components/ChooseTicket.vue'
import Movies from './components/Movies.vue'
import MovieForm from './components/MovieForm.vue'


const NotFound = { template: '<p>Page not found</p>' }







const routes = {
  '/': App,
  '/choose-ticket': ChooseTicket,
  '/movies': Movies,
  '/add-movie': MovieForm
}

new Vue({
  el: '#app',
  data () {
    return {
      currentRoute: window.location.pathname
    }
    
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
