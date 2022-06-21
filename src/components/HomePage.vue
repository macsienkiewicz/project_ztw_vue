<template>
<body>
  <Movies @delete:movie="getMovies" :moviesSource="movies"/>
  <AuthenticationButton v-if="$auth.isAuthenticated" />
  


</body>
  

</template>

<script>
import Movies from './Movies.vue'
import AuthenticationButton from './AuthenticationButton.vue'


export default {
    name: 'HomePage',
    components: {
      Movies,
      AuthenticationButton,
    },

    data() {
      return {
        movies: []
      }
    },

    mounted() {
      this.getMovies()
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

   
  
    

    }

    

    
  }
</script>

<style>
body {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(255, 255, 255);
  margin-top: 60px;
}
</style>
