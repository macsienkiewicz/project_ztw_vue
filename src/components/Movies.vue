<template>

    
    <body>
        <!-- Tu bedzie jeszcze logo i menu -->
        <h2>Filmy</h2>


        <div v-for="movie in moviesSource" v-bind:key="movie.id">
        <h5>{{ movie.name }}</h5>
        <i>Czas trwania: {{ movie.duration }} min</i><br/>
        {{ movie.description }}
        <img alt="movie img" v-bind:src="movie.imageLink" class="photo">
        <br/><br/>
        <router-link tag="button" v-if="!$auth.isAuthenticated" :to="{ name: 'Choose Ticket', params: { id: movie.id }}">Kup Bilet</router-link>
        <router-link tag="button" v-if="$auth.isAuthenticated" :to="{ name: 'Update Movie', params: { id: movie.id }}">Edytuj film</router-link><br/>
        <button v-if="$auth.isAuthenticated" @click="deleteMovie(movie.id)">Usuń</button>

        </div>
    
    </body>
</template>
<script>



 export default {
     name: 'movies-table',
     props: {
        moviesSource: Array,
    },

    

    methods: {
       
        
        deleteMovie(id) {
            // const xhr = new XMLHttpRequest()
            // const url = "http://localhost:8080/movies/" + id
            // xhr.open("DELETE", url, false)
            // xhr.send()
            // console.log(xhr.responseText)
            // this.$emit("delete:movie")

            const xhr = new XMLHttpRequest();
            const url = "http://localhost:8080/movies/" + id
            alert(id)
            xhr.open("DELETE", url, false)
            xhr.setRequestHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
            xhr.send();


            console.log(xhr.responseText)
            // alert('Dane usunięte pomyślnie')
            this.$emit('delete:movie');

        },
        

    }
    
    

 }
</script>
<style>
h2, h5 {
    color: rgb(255, 255, 255);
}

body {
    text-align: center;
    background-color: #0d150d;
    color: rgb(255, 255, 255);
    font-family: Helvetica;
    font-size: 24px;
}

div {
    text-align: left;
    font-size: 18px;
}
.photo {
    height: 20%;
    width: 20%;
    margin-left: auto;
    margin-right: auto;
}
</style>