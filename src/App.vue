<template>
  <div id="box">
    <transition name="fade" appear>
      <div id="header" class="container-fluid blue">
        <div class="row">
          <div class="col-7 col-md-3 title" id="logo">
            <img id="star" class="rotate icon" src="./img/star.svg">
            <div class="logo-text">aimslist</div>
          </div>
          <div class="col-2 col-md-2 offset-md-5 justify-content-center align-items-center" id="user-email">
            {{userEmail}}
          </div>
          <div class="col-3 col-md-1">
            <router-link to="/">
              <button class="btn white login" v-if="!isLoggedIn">
                Войти
              </button>
              <button class="btn white login" @click="logout" v-if="isLoggedIn">
                Выйти
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </transition>

    <router-view></router-view>
    <v-dialog/>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'app',

    data() {
      return {
//        newProjectState: false,
//        projectData: {selected: false},
//        showHeader: false,
//        makeProject: {},
//        changedProject: {}
        isLoggedIn: false,
        userEmail: ''
      }
    },

    created() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLoggedIn = true;
          this.userEmail = user.email;
        }
        else {
          this.isLoggedIn = false;
          this.userEmail = '';
        }
      });
    },

    mounted() {
      let star = document.getElementById('star');
      star.classList.add("rotateStart");
    },

    methods: {

      logout() {
        firebase.auth().signOut().then(() => this.$router.go({path: '/signIn'}))
      }

    },
  }

</script>

<style>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.icon {
  width: 34px;
}
.logo-text {
  font-family: 'Lobster', cursive;
  font-style: normal;
  font-size: 2rem;
  margin: 0 0 0 6px;
}

.rotateStart {
  animation: rotate .9s linear;
}

.rotate:hover {
  animation: rotate 1.8s infinite linear;
}

@keyframes rotate{

  from {
    transform:  rotate(0);
  }
  to {
    transform: rotate(360deg);
  }

}

.white {
  background-color: #FFFFFF;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
}

.blue {
  background-color: #1E90FF;
  color: white;
}

</style>
