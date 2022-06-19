<template>
<body>
    <router-link v-if="$auth.isAuthenticated" :to="{ name: 'Admin Panel'}">Powrót do panelu administratora</router-link>
	<h2>Edytuj film</h2>
    <div>
    <form @submit.prevent="handleSubmit">
			<label>Nazwa filmu<br/></label>
			<input
				v-model="movie.name"
				type="text"
                maxlength="64"
				:class="{ 'has-error': submitting && invalidText }" 
				@focus="clearStatus"
				@keypress="clearStatus"
			/><br/>
			<label>Czas trwania<br/></label>
			<input
				v-model="movie.duration"
				type="number"
				:class="{ 'has-error': submitting && invalidDuration }" 
				@focus="clearStatus"
				@keypress="clearStatus"
			/><br/>
			<label>Opis<br/></label>
			<input
				v-model="movie.description"
				type="text"
                maxlength="255"
				:class="{ 'has-error': submitting && invalidText }"
				@focus="clearStatus"
				@keypress="clearStatus"
			/><br/>
			<label>Zdjęcie<br/></label>
			<input
				v-model="movie.imageLink"
				type="text"
                maxlength="255"
				:class="{ 'has-error': submitting && invalidText }"
				@focus="clearStatus"
				@keypress="clearStatus"
			/><br/>
			
			
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
		name: 'MovieUpdate',
		data() {
			return {
				movie: {
					submitting: false,
					error: false,
					success: false,
					name: '',
					duration: '',
					description: '',
					imageLink: '',
				}
			}
		},
        mounted() {
            this.getMovie();
        },
		methods: {
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
			handleSubmit() {
				this.submitting = true
				this.clearStatus()
				//check form fields
				if (this.invalidText || this.invalidDuration) {
					this.error = true
					return
				}

				const xhr = new XMLHttpRequest();
                xhr.open("PUT", "http://localhost:8080/movies/" + this.$route.params.id, false);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader("Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept");
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
                xhr.send(JSON.stringify(this.movie));

                this.success = true;
                this.submitting = false;
			},

			clearStatus() {
				this.success = false
				this.error = false
			},
		},
		computed: {
			invalidText() {
				return this.movie.name === '' || this.movie.description === ''
			},
			invalidDuration() {
				return this.movie.duration <= -1 || this.movie.duration === ''
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
