<template>
<body>
	<h2>Edytuj salę</h2>
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
			<button>Zapisz</button>
		</form>
        </div>
</body>
</template>

<script>
export default {
		name: 'AuditoriumUpdate',
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
            async getAuditorium() {
                try {
                //const response = await fetch('https://jsonplaceholder.typicode.com/users%27)
                const response = await fetch("http://localhost:8080/auditoriums/" + this.$route.params.id)
                const data = await response.json()
                this.auditorium = data
                } catch (error) {
                    console.error(error)
                    } 
                    },
			handleSubmit() {
				this.submitting = true
				this.clearStatus()
				//check form fields
				if (this.invalidNumber) {
					this.error = true
					return
				}

				const xhr = new XMLHttpRequest();
                xhr.open("PUT", "http://localhost:8080/auditoriums/" + this.$route.params.id, false);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader("Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept");
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
                xhr.send(JSON.stringify(this.auditorium));

                this.success = true;
                this.submitting = false;
                },
			clearStatus() {
				this.success = false
				this.error = false
			},
		},
        mounted() {
            this.getAuditorium()
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