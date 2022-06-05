<template>

    
    <body>
        <!-- Tu bedzie jeszcze logo i menu -->
        <h2>Filmy</h2>


        <div v-for="movie in movies" :key="movie.id">
        <h3>{{ movie.name }}</h3><br/>
        {{ movie.duration }}<br/>
        {{ movie.description }}<br/>
        <button>Kup bilet</button>
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
       
        /*
        buyTicket(id) {
            //todo
        }
        */

    }
    
    

 }
</script>
<style>
h2, h3 {
    color: rgb(255, 255, 255);
}

body {
    text-align: center;
    background-color: #0d150d;
    color: rgb(255, 255, 255);
    font-family: Helvetica;
    font-size: 24px;
}
</style>