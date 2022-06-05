import App from './App.vue';
import ChooseTicket from './components/ChooseTicket.vue';
import Movies from './components/Movies.vue';
import MovieForm from './components/MovieForm.vue';


export default [
    { path: '/', component: App},
    { path: '/choose-ticket', component: ChooseTicket },
    { path: '/movies', component: Movies },
    { path: '/add-movie', component: MovieForm }

]