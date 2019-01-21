<template>
	<transition name="fade6" :duration="{ leave: 0 }">
		<div class="container mar-top">
			<form action="">
				<div class="row justify-content-center">
					<input type="text" class="col-9 col-md-6" placeholder="E-mail" v-model="email">
				</div>
				<div class="row justify-content-center marg-top">
					<input type="password" class="col-9 col-md-6" placeholder="Пароль" v-model="password">
				</div>
				<div class="row justify-content-center m-top3">
					<button type="submit" class="btn btn-primary col-6 col-md-3" @click="signIn">Вход</button>
				</div>
			</form>
			<!--<div class="row justify-content-center marg-top">-->
				<!--<button class="btn btn-primary col-6 col-md-3" @click="showOff">Отмена</button>-->
			<!--</div>-->
			<div class="row justify-content-center m-top3">
				<router-link to="/signUp">
					<a>Регистрация</a>
				</router-link>
			</div>
		</div>
	</transition>
</template>

<script>
	import firebase from 'firebase'

	export default {

		data() {
			return {
				email: '',
				password: ''
			}
		},

		methods: {

			showOff() {
				this.$router.push('/');
			},

      signIn(e) {
			  e.preventDefault();
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
					.then(res => {
              localStorage.setItem('userId', res.user.uid);
//					  console.log(res);
              this.$modal.show('dialog', {
              title: 'Сообщение',
              text: `Вы вошли как ${res.user.email}`,
              buttons: [
                {
                  title: 'Ok',
                  default: true,
                  handler: () => {
                    this.$modal.hide('dialog');
                  }
                }
              ]
            });
              this.$router.push('/main');
            },
						err => {
							alert(err.message);
						});
      }

		}
  }

</script>

<style scoped>

.m-top3 {
	margin-top: 4.8%;
}

.marg-top {
	margin-top: 1.6%;
}

.mar-top {
	margin-top: 14%;
}

</style>
