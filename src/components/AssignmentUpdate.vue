<template>
<body>
	<router-link tag="button" v-if="$auth.isAuthenticated" :to="{ name: 'Admin Panel'}">Powrót do panelu administratora</router-link>
	<h2>Edytuj assignment</h2>
    <div>
    <form @submit.prevent="handleSubmit">
			<label>Godzina<br/></label>
			<input
				v-model="assignment.startsAt"
				type="time"
                step="1"
                class="white"
				:class="{ 'has-error': submitting && invalidTime }" 
				@focus="clearStatus"
				@keypress="clearStatus"
			/><br/>
			<label>Start date<br/></label>
			<input
				v-model="assignment.startDate"
				type="date"
                class="white"
				:class="{ 'has-error': submitting && invalidStartDate }" 
				@focus="clearStatus"
				@keypress="clearStatus"
			/><br/>
            <label>End date<br/></label>
			<input
				v-model="assignment.endDate"
				type="date"
                class="white"
				:class="{ 'has-error': submitting && invalidEndDate }" 
				@focus="clearStatus"
				@keypress="clearStatus"
			/><br/>
            <label>Movie</label>
			<select name="movies" v-model="assignment.movieId">
				<option v-for="movie in movies" :key="movie.id" :value="movie.id">
					{{ movie.name }}
				</option>
			</select>
            <label>Auditorium</label>
			<select name="auditoriums" v-model="assignment.auditoriumId">
				<option v-for="auditorium in auditoriums" :key="auditorium.id" :value="auditorium.id">
					{{ auditorium.id }}
				</option>
			</select>

			
			
			
			<p v-if="error && submitting" class="error-message">
				Proszę wypełnić wskazane pola formularza
			</p>
			<p v-if="success" class="success-message">
				Dane poprawnie zapisano
			</p>
			<button>Zapisz</button>
		</form>
        </div>
</body>
</template>

<script>
export default {
		name: 'AssignmentUpdate',
		data() {
			return {
				assignment: {
					submitting: false,
					error: false,
					success: false,
					startsAt: '',
					startDate: '',
					endDate: '',
					movieId: '',
                    auditoriumId: '',
				},
                movies: [],
                auditoriums: [],
			}
		},
		methods: {
            async getMovies() {
				try {
					const response = await fetch("http://localhost:8080/movies")
					const data = await response.json()
					this.movies = data 
				} catch (error) {
					this.error = true
					console.error(error)

				}
			},
            async getAuditoriums() {
				try {
					const response = await fetch("http://localhost:8080/auditoriums")
					const data = await response.json()
					this.auditoriums = data 
				} catch (error) {
					this.error = true
					console.error(error)

				}
			},
			async getAssignment() {
                try {
                //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
                const response = await fetch("http://localhost:8080/assignments/" + this.$route.params.id)
                const data = await response.json()
                this.assignment = data
                } catch (error) {
                    console.error(error)
                    } 
                    },
			handleSubmit() {
				this.submitting = true
				this.clearStatus()
				//check form fields
				if (this.invalidTime || this.invalidStartDate || this.invalidEndDate) {
					this.error = true
					return
				}

				const xhr = new XMLHttpRequest();
                xhr.open("PUT", "http://localhost:8080/assignments/" + this.$route.params.id, false);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader("Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept");
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
                xhr.send(JSON.stringify(this.assignment));

                this.success = true;
                this.submitting = false;
			},
			clearStatus() {
				this.success = false
				this.error = false
			},
		},
        mounted() {
            this.getAssignment()
			this.getMovies();
            this.getAuditoriums();
		},
		computed: {
			invalidTime() {
				return this.assignment.startsAt === ''
			},
			invalidStartDate() {
				return this.assignment.startDate  === ''
			},
            invalidEndDate() {
				return this.assignment.endDate < this.assignment.startDate || this.assignment.endDate === ''
			},
		},
	}
</script>

<style>

body {
    background-color: #0d150d;
    color: rgb(255, 255, 255);
    font-family: Helvetica;
    font-size: 24px;
    margin: auto;
    max-width: 680px; 
}

input {
    background-color: rgb(255, 255, 255);
}

form {
		margin-bottom: 2rem;
	}
	[class*='-message'] {
		font-weight: 500;
	}
	.error-message {
		color: #d33c40;
	}
	.success-message {
		color: #32a95d;
	}

button {
     background: #008894;
     border: 1px solid #009435;
   }

input[type="text"], input[type="number"], textarea {
    background-color: #ffffff;
}
</style>
