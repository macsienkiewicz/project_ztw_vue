

import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import ChooseTicket from './components/ChooseTicket.vue'
import TicketSummary from './components/TicketsSummary.vue'
import Home from './components/HomePage.vue'
import MovieForm from './components/MovieForm.vue'
import MovieUpdate from './components/MovieUpdate.vue'
import AuditoriumUpdate from './components/AuditoriumUpdate.vue'
import AssignmentUpdate from './components/AssignmentUpdate.vue'
import AdminPanel from './components/AdminPanel.vue'


// import { domain, clientId, audience } from '../auth_config.json'
// import { Auth0Plugin } from '@/auth/auth0-plugin'


import { domain, clientId, audience } from '../auth_config.json'
import { Auth0Plugin } from '@/auth/auth0-plugin'
import { authenticationGuard } from '@/auth/authenticationGuard'



// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount('#app');


// const NotFound = { template: '<p>Page not found</p>' }



Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/choose-ticket/:id',
      name: 'Choose Ticket',
      component: ChooseTicket,
      params: castPropToNumber,
    },
    {
      path: '/ticket-summary/:id',
      name: 'Ticket Summary',
      component: TicketSummary,
    },
    {
      path: '/add-movie',
      name: 'Add Movie',
      component: MovieForm,
    },
    {
      path: '/update-movie/:id',
      name: 'Update Movie',
      component: MovieUpdate,
      params: castPropToNumber,
      beforeEnter: authenticationGuard,
    },
    {
      path: '/update-assignment/:id',
      name: 'Update Assignment',
      component: AssignmentUpdate,
      params: castPropToNumber,
      beforeEnter: authenticationGuard,
    },
    {
      path: '/update-auditorium/:id',
      name: 'Update Auditorium',
      component: AuditoriumUpdate,
      params: castPropToNumber,
      beforeEnter: authenticationGuard,
    },
    {
      path: '/admin-panel',
      name: 'Admin Panel',
      component: AdminPanel,
      beforeEnter: authenticationGuard,
    },
   
  ]
})

function castPropToNumber(route) {
  return {
      id: Number(route.params.id)
  };
}




// const routes = {
//   '/': App,
//   '/choose-ticket': ChooseTicket,
//   '/add-movie': MovieForm,
//   '/admin-panel': AdminPanel
// }

// new Vue({
//   el: '#app',
//   data () {
//     return {
//       currentRoute: window.location.pathname
//     }
    
//   },
//   computed: {
//     ViewComponent () {
//       return routes[this.currentRoute] || NotFound
//     }
//   },
//   render (h) { return h(this.ViewComponent) }
// })

// Install the authentication plugin
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// // Vue.use(Auth0Plugin, {
// //   domain,
// //   clientId,
// //   audience,
// //   onRedirectCallback: (appState) => {
// //     routes.push(
// //       appState && appState.targetUrl
// //         ? appState.targetUrl
// //         : window.location.pathname,
// //     );
// //   },
// // });

// // Vue.config.productionTip = false

