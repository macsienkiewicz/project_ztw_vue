<template>
<body>
    <!-- Tu bedzie jeszcze logo i menu -->
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
			
			
			<p v-if="error && submitting" class="error-message">
				Proszę wypełnić wskazane pola formularza
			</p>
			<p v-if="success" class="success-message">
				Dane poprawnie zapisano
			</p>
			<button>Dodaj film</button>
		</form>
        </div>
</body>
</template>

<script>
export default {
		name: 'movie-form',
		data() {
			return {
				movie: {
					submitting: false,
					error: false,
					success: false,
					name: '',
					duration: '',
					description: '',
				}
			}
		},
		methods: {
			handleSubmit() {
				this.submitting = true
				this.clearStatus()
				//check form fields
				if (this.invalidText || this.invalidDuration) {
					this.error = true
					return
				}

				const xhr = new XMLHttpRequest()
				xhr.open("POST", "http://localhost:8080/movies", false)
				xhr.setRequestHeader('Content-type', 'application/JSON')
				xhr.send(JSON.stringify(this.movie))
				console.log(JSON.stringify(this.movie))
				this.$emit('add:movie')
				console.log(xhr.status)

				
				//clear form fields
				this.movie = {
					name: '',
					duration: '',
					description: '',
				}

				
				this.error = false
				this.success = true
				this.submitting = false
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
