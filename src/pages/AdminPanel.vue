<template>
<body>
  <AuthenticationButton />
  <Loading v-if="$auth.isLoading" />
  <div v-else>
  <div>
    <MovieForm @add:movie="getMovies"/>
    <Movies @delete:movie="getMovies" :moviesSource="movies"/>
    <AssignmentForm @add:assignment="getAssignments"/>
    <Assignments @delete:assignment="getAssignments" :assignmentsSource="assignments"/>
    <AuditoriumForm @add:auditorium="getAuditoriums"/>
    <Auditoriums @delete:auditorium="getAuditoriums" :auditoriumsSource="auditoriums"/>
    
  </div>
  </div>
  
  


</body>
  

</template>

<script>
import Movies from '../components/Movies.vue'
import MovieForm from '../components/MovieForm.vue'
import Assignments from '../components/Assignments.vue'
import AssignmentForm from '../components/AssignmentForm.vue'
import Auditoriums from '../components/Auditoriums.vue'
import AuditoriumForm from '../components/AuditoriumForm.vue'
import AuthenticationButton from '../components/AuthenticationButton.vue'



export default {
    name: 'admin-panel',
    components: {
      Movies,
      AuthenticationButton,
      MovieForm,
      Assignments,
      AssignmentForm,
      Auditoriums,
      AuditoriumForm,
    },

    data() {
      return {
        movies: [],
        assignments: [],
        auditoriums: [],
      }
    },

    mounted() {
      this.getMovies()
      this.getAssignments()
      this.getAuditoriums()
    },

    methods: {
      async getMovies() {
        try {
        //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
        const response = await fetch("http://localhost:8080/movies")
        const data = await response.json()
        this.movies = data
        } catch (error) {
          console.error(error)
          }      
    },

    async getAssignments() {
        try {
        //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
        const response = await fetch("http://localhost:8080/assignments")
        const data = await response.json()
        this.assignments = data
        } catch (error) {
          console.error(error)
          }      
    },

    async getAuditoriums() {
        try {
        //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
        const response = await fetch("http://localhost:8080/auditoriums")
        const data = await response.json()
        this.auditoriums = data
        } catch (error) {
          console.error(error)
          }      
    },

    handleSubmit() {
        this.$emit('add:movie', this.movie)
        this.$emit('add:assignment', this.assignment)
        this.$emit('add:auditorium', this.auditorium)
      }, 
    
    addMovie(movie) {
        this.movies = [...this.movies, movie]
      },
    addAssignment(assignment) {
        this.assignments = [...this.assignments, assignment]
      },
    addAuditorium(auditorium) {
        this.auditoriums = [...this.auditoriums, auditorium]
      },

   
  
    

    }

    

    
  }
</script>

<style>
#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>