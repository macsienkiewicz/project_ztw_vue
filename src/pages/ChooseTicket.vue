<template>
<body>

    <router-link tag="button" :to="{ name: 'Home'}">Powrót do strony głównej</router-link>
    <div>Wybrany film: {{ movie.name }} </div>

    <div>Wybierz godzinę:</div>
    <select name="assignments" @change="getAuditorium(assignment_id)" v-model="assignment_id">Wybierz godzinę: 
          <option v-for="assignment in assignments" :key="assignment.id" :value="assignment.id">
            {{ assignment.startsAt }}
          </option>
        </select><br/>

    <div>Wybierz datę:</div>
    <select name="hours" @change="getDate(d)" v-model="d">Wybierz datę: 
				<option v-for="date in dates" :key="date" :value="date">
					{{ date }}
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

      <div v-for="r in seats/10" :key="r" class="row">
      <div v-for="s in 10" :key="s">
        <div class="seat occupied" v-if="occupied.includes(r * 10 + s - 10)">{{ r * 10 + s - 10 }}</div>
        <div class="seat selected" v-else-if="selected.includes(r * 10 + s - 10)" @click="clickSeat(r * 10 + s - 10)">{{ r * 10 + s - 10 }}</div>
        <div class="seat" v-else @click="e => e.target.classList.toggle('selected') && clickSeat(r * 10 + s - 10)">{{ r * 10 + s - 10 }}</div>

        </div>
        </div>

    </div>

    <div>Wybrane miejsca: {{ selected.length }}</div>

    <p v-if="error && submitting" class="error-message">
				Nie wybrano miejsc!
			</p>
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
        seats: '',
        movie: '',
        assignments: [],
        assignment: '',
        dates: [],
        date: '',
        movie_id: '',
        booked_tickets: [],
        booked_ticket: {
          submitting: false,
					error: false,
					success: false,
          seatNumber: '',
          code: '',
          movieId: '',
          startsAt: '',
          movieDate: '',
        },
      }  
    },
    
     mounted() {
      // this.getMovieId();
      this.getMovie();
      this.getAssignments();

    },

    computed: {
			invalidTickets() {
				return this.selected.length == 0 
			},
      invalidDate() {
        return this.date === ''
      }
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
          const today = new Date()
          for(var i = 0; i < data.length; i++) {
            const end_date = new Date(data[i].endDate)
            if(today < end_date) {
              this.assignments.push(data[i])
            }
          }
          } catch (error) {
            console.error(error)
            }    
      },
      async getAuditorium(assignment_id) {
        this.assignment = ''
        this.seats = ''
        this.occupied = []
        this.selected = []
        this.dates = []
        try {
          //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
          const response = await fetch("http://localhost:8080/assignments/" + assignment_id)
          const data = await response.json()
          this.assignment = data
          this.getDates()
          
          } catch (error) {
            console.error(error)
            } 
      },
      async getDates() {
        const today = new Date()
        const start_date = new Date(this.assignment.startDate)
        const end_date = new Date(this.assignment.endDate)
        // this.dates = this.getDatesInRange(start_date, end_date)
        var time = this.assignment.startsAt.split(':')
        var t = new Date(today.getTime())
        var start_today = new Date(today.setHours(time[0], time[1], time[2]))
        if (t > start_today) {
          today.setDate(today.getDate() + 1)
        }
        if(end_date > today) {
          this.dates = this.getDatesInRange(today, end_date)
          if(start_date > today) {
            this.dates = this.getDatesInRange(start_date, end_date)
          }
          else {
            this.dates = this.getDatesInRange(today, end_date)
            
          }
        }

      },
      getDatesInRange(startDate, endDate) {
        var time = this.assignment.startsAt.split(':')
        const date = new Date(startDate.setHours(time[0], time[1], time[2]))

        

        const dates = []

        while (date < endDate) {
          var d = new Date(date)
          var date_string = d.getFullYear() + "-" + (d.getMonth()+1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + "-" + d.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
          dates.push(date_string)
          date.setDate(date.getDate() + 1)
        }

        return dates;
      },

      async getDate(d) {
        this.date = d
        this.occupied = []
        this.selected = []
        try {
          const response_seats = await fetch("http://localhost:8080/booked-tickets/assignmentID=" + this.assignment.id + "/movieDate=" + this.date)
          const data_seats = await response_seats.json()
          this.occupied =  [...this.occupied, ...data_seats]
          this.seats = this.assignment.auditorium.seats
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
        this.submitting = true
				if (this.invalidTickets || this.invalidDate) {
					this.error = true
					return
				}
        this.occupied = [...this.occupied, ...this.selected]
        for (var i = 0; i < this.selected.length; i++) {
          const xhr = new XMLHttpRequest()
          xhr.open("POST", "http://localhost:8080/booked-tickets", false)
          xhr.setRequestHeader('Content-type', 'application/JSON')
          var code = this.date + this.assignment.startsAt + this.assignment.id + this.selected[0] 
          this.booked_ticket.code = code 
          this.booked_ticket.movieDate = this.date
          this.booked_ticket.seatNumber = this.selected[i]
          this.booked_ticket.movieId = this.movie.id
          this.booked_ticket.startsAt = this.assignment.startsAt
          xhr.send(JSON.stringify(this.booked_ticket))
          console.log(JSON.stringify(this.booked_ticket))
          this.$emit('add:bookedticket')
          console.log(xhr.status)

          this.error = false
          this.success = true
          this.submitting = false

          this.booked_ticket = {
            submitting: false,
            error: false,
            success: false,
            seatNumber: '',
            code: '',
            movieId: '',
            startsAt: '',
            movieDate: '',
          }
        }

				

        this.selected = []
        var new_location = "http://localhost:8086/ticket-summary/" + code
        window.location.href = new_location


        
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

.error-message {
		color: #d33c40;
	}
</style>
