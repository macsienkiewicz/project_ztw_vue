<template>

    
    <body>
        <h2>Sale</h2>


        <div v-for="auditorium in auditoriumsSource" v-bind:key="auditorium.id">
        Nr sali: {{ auditorium.id }}<br/>
        Liczba miejsc: {{ auditorium.seats }}
        <br/><br/>
        <router-link v-if="$auth.isAuthenticated" :to="{ name: 'Update Auditorium', params: { id: auditorium.id }}">Edytuj</router-link><br/>
        <button v-if="$auth.isAuthenticated" @click="deleteAuditorium(auditorium.id)">Usuń</button>

        </div>
    
    </body>
</template>
<script>



 export default {
     name: 'auditoriums-table',
     props: {
        auditoriumsSource: Array,
    },

    

    methods: {
       
        
        deleteAuditorium(id) {
            // const xhr = new XMLHttpRequest()
            // const url = "http://localhost:8080/movies/" + id
            // xhr.open("DELETE", url, false)
            // xhr.send()
            // console.log(xhr.responseText)
            // this.$emit("delete:movie")

            const xhr = new XMLHttpRequest();
            const url = "http://localhost:8080/auditoriums/" + id
            alert(id)
            xhr.open("DELETE", url, false)
            xhr.setRequestHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
            xhr.send();


            console.log(xhr.responseText)
            // alert('Dane usunięte pomyślnie')
            this.$emit('delete:auditorium');

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
</style>