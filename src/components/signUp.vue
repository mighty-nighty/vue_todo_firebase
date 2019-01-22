<template>
  <transition name="fade" mode="out-in">
    <div class="container m-top3">
      <form action="">
        <div class="row justify-content-center">
          <input type="text" class="col-9 col-md-6" placeholder="E-mail" v-model="email">
        </div>
        <div class="row justify-content-center m-top">
          <input type="password" class="col-9 col-md-6" placeholder="Пароль" v-model="password">
        </div>
        <div class="row justify-content-center m-top2">
          <button type="submit" class="btn btn-primary col-6 col-md-3" @click.prevent="registerUser">Зарегистрировать</button>
        </div>
      </form>
      <div class="row justify-content-center m-top">
        <button class="btn btn-primary col-6 col-md-3" @click="showOff">Отмена</button>
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

      registerUser() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(res => {
              localStorage.setItem('userId', res.user.uid);
              this.$modal.show('dialog', {
                title: 'Сообщение',
                text: `Пользователь ${res.user.email} зарегистрирован успешно!`,
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
            })
      }

    }
  }

</script>

<style scoped>

  .m-top {
    margin-top: 1.6%;
  }

  .m-top2 {
    margin-top: 4.8%;
  }

</style>
