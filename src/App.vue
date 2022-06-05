<template>
<body>
  <img alt="Vue logo" src="./assets/logo.png">
  <Movies :moviesSource="movies"/>

</body>
  

</template>

<script>
import Movies from '@/components/Movies.vue'


export default {
    name: 'app',
    components: {
      Movies, 
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
