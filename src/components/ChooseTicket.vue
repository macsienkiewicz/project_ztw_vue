<template>
<body>

  <div>Wybrany film: {{ movie.name }} </div>

  <select name="assignments" @change="getAuditorium(assignment_id)" v-model="assignment_id">
				<option v-for="assignment in assignments" :key="assignment.id" :value="assignment.id">
					{{ assignment.startsAt }}
				</option>
			</select>

    <ul class="showcase">
      <li>
        <div class="seat"></div>
        <small>Wolne</small>
      </li>
      <li>
        <div class="seat selected"></div>
        <small>Wybrane</small>
      </li>
      <li>
        <div class="seat occupied"></div>
        <small>Zajęte</small>
      </li>
    </ul>

    <div class="screen">Ekran</div>


    <div class="container">

      <div v-for="r in seats/10" :key="r" class="row">{{ r }}
      <div v-for="s in 10" :key="s">
        <div class="seat occupied" v-if="occupied.includes(r * 10 + s - 10)">{{ s }}</div>
        <div class="seat selected" v-else-if="selected.includes(r * 10 + s - 10)" @click="clickSeat(r * 10 + s - 10)">{{ s }}</div>
        <div class="seat" v-else @click="e => e.target.classList.toggle('selected') && clickSeat(r * 10 + s - 10)">{{ s }}</div>

        </div>
        </div>

    </div>

    <div>Wybrane miejsca: {{ selected.length }} <br/> (tymczasowo: {{assignment_id}}  {{assignment}})</div>

    <button @click="buyTickets">Kup bilety</button>
</body>
</template>

<script>



export default {
    name: 'choose-ticket',
    props: {
      id: Number,

    },
    data() {
      return {
        assignment_id: '',
        occupied: [],
        selected: [],
        seats: 0,
        movie: '',
        assignments: [],
        assignment: '',
        movie_id: '',
      }  
    },
    
     mounted() {
      // this.getMovieId();
      this.getMovie();
      this.getAssignments();
    },
     
    
    methods: {
      // async getMovieId() {
      //   this.movie_id = this.$route.params.id
      // },
      async getMovie() {
        try {
          //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
          const response = await fetch("http://localhost:8080/movies/" + this.$route.params.id)
          const data = await response.json()
          this.movie = data
          } catch (error) {
            console.error(error)
            } 
      },
       async getAssignments() {
        try {
          //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
          const response = await fetch("http://localhost:8080/assignments/movieID=" + this.$route.params.id)
          const data = await response.json()
          this.assignments = data
          } catch (error) {
            console.error(error)
            }    
      },
      async getAuditorium(assignment_id) {
        try {
          //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
          const response = await fetch("http://localhost:8080/assignments/" + assignment_id)
          const data = await response.json()
          this.assignment = data
          this.seats = data.auditorium.seats
          
          } catch (error) {
            console.error(error)
            } 
      },
      clickSeat(id) {
        if(this.selected.includes(id)) {
          this.selected = this.selected.filter(function(ele) {
            return ele != id
          })
        }
        else {
          this.selected = [...this.selected, id]
        }
        
      },

      buyTickets() {
        this.occupied = [...this.occupied, ...this.selected]
        this.selected = []
        
      },


      




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



.seat {
    text-align: center;
    background-color: #6aaf67;
    color: rgb(255, 255, 255);
    height: 40px;
    width: 50px;
    margin: 7px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
}

.seat.selected {
    background-color: #6feaf6;
}

.seat.occupied {
    background-color: rgb(91, 2, 2);
}

.seat:nth-of-type(4) {
    margin-right: 40px;
}

.seat:nth-last-of-type(2) {
    margin-left: 40px;
}

.seat:not(.occupied):hover {
    cursor: pointer;
    transform: scale(1.2);
}


.showcase .seat:not(.occupied):hover {
    cursor: default;
    transform: scale(1);
}



.showcase {
    margin: auto;
    max-width: 680px; 
    padding: 5px 10px;
    border-radius: 5px;
    color: rgb(255, 255, 255);
    list-style-type: none;
    display: flex;
    justify-content: space-between;
}

.showcase li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
}

.showcase li small {
    margin-left: 2px;
}

.container {
    color: #777;
    margin-top: 60px;
    perspective: 1000px;
    margin-bottom: 30px;
}

.screen {
    color: #777;
    margin-top: 60px;
    perspective: 1000px;
    margin-bottom: 30px;
}

.row {
    margin: auto;
    max-width: 680px; 
    display: flex;
}
select {
  background-color: rgb(255, 255, 255);
}
</style>
