<template>
<body>
	<h2>Dodaj salę</h2>
    <div>
    <form @submit.prevent="handleSubmit">
			<label>Liczba miejsc<br/></label>
			<input
				v-model="auditorium.seats"
				type="number"
				:class="{ 'has-error': submitting && invalidNumber }" 
				@focus="clearStatus"
				@keypress="clearStatus"
			/><br/>
			
			
			<p v-if="error && submitting" class="error-message">
				Proszę wypełnić wskazane pola formularza
			</p>
			<p v-if="success" class="success-message">
				Dane poprawnie zapisano
			</p>
			<button>Dodaj salę</button>
		</form>
        </div>
</body>
</template>

<script>
export default {
		name: 'AuditoriumForm',
		data() {
			return {
				auditorium: {
					submitting: false,
					error: false,
					success: false,
					seats: '',
				}
			}
		},
		methods: {
			handleSubmit() {
				this.submitting = true
				this.clearStatus()
				//check form fields
				if (this.invalidNumber) {
					this.error = true
					return
				}

				const xhr = new XMLHttpRequest()
				xhr.open("POST", "http://localhost:8080/auditoriums", false)
				xhr.setRequestHeader('Content-type', 'application/JSON')
				xhr.send(JSON.stringify(this.auditorium))
				console.log(JSON.stringify(this.auditorium))
				this.$emit('add:auditorium')
				console.log(xhr.status)

				
				//clear form fields
				this.auditorium = {
					seats: '',
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
			invalidNumber() {
				return this.auditorium.seats <= -1 || this.auditorium.seats === ''
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