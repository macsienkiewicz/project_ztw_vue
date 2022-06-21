<template>
<body>

  
    <div>Wybrany film: {{ movie.name }} </div><br/>

  
    <div>Wybrane miejsca: {{ selected_seats }}</div><br/>
    <div>Kod: {{ $route.params.id }}</div><br/>
    <div>Sala: {{ assignment.auditorium.id }}</div><br/>
    <div>Godzina: {{ assignment.startsAt }}</div><br/><br/>
    <h5>Dziękujemy za zakup biletów!</h5>


    <router-link :to="{ name: 'Home'}">Powrót do strony głównej</router-link>
</body>
</template>

<script>



export default {
    name: 'ticket-summary',
    props: {
      id: String,

    },
    data() {
      return {
        selected: [],
        selected_seats: '',
        movie: '',
        assignment: '',
        booked_ticket: '',
      }  
    },
    
     mounted() {
      // this.getMovieId();
      this.getTickets();

    },

     
    
    methods: {
      async getTickets() {
        try {
          //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
          const response = await fetch("http://localhost:8080/booked-tickets/code=" + this.$route.params.id)
          const data = await response.json()
          this.booked_ticket = data
          this.assignment = data[0].assignment
          this.movie = data[0].assignment.movie
          for(var i = 0; i < this.booked_ticket.length; i++) {
            this.selected.push(data[i].seatNumber)
          }
          this.selected_seats = this.selected
          } catch (error) {
            console.error(error)
            } 
      },
    
     
       
    //   async getAuditorium(assignment_id) {
    //     try {
    //       //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
    //       const response = await fetch("http://localhost:8080/assignments/" + assignment_id)
    //       const data = await response.json()
    //       this.assignment = data
    //       this.seats = data.auditorium.seats
    //       const response_seats = await fetch("http://localhost:8080/booked-tickets/assignmentID=" + assignment_id)
    //       const data_seats = await response_seats.json()
    //       this.occupied =  [...this.occupied, ...data_seats]
    //       } catch (error) {
    //         console.error(error)
    //         } 
    //   },
      

      


      




    }
    
}




</script>

<style>
body {
    text-align: center;
    background-color: #0d150d;
    color: rgb(255, 255, 255);
    font-family: Helvetica;
    font-size: 24px;
}

.screen {
  text-align: center;
}

h2, h5 {
    color: rgb(255, 255, 255);
}




.error-message {
		color: #d33c40;
	}
</style>