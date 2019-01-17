<template>
  <div id="box">
    <transition name="fade" appear>
      <div id="header" class="container-fluid blue">
        <div class="row">
          <div class="col-7 col-md-3 title" id="logo">
            <img id="star" class="rotate icon" src="./img/star.svg">
            <div class="logo-text">aimslist</div>
          </div>
          <div class="col-3 offset-1 col-md-1 offset-md-7">
            <router-link to="/signIn">
              <button class="btn white login" @click="signInShow = true">
                Войти
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

  export default {
    name: 'app',

    data() {
      return {
//        newProjectState: false,
//        projectData: {selected: false},
//        showHeader: false,
//        makeProject: {},
//        changedProject: {}
      }
    },

    mounted() {
      let star = document.getElementById('star');
      star.classList.add("rotateStart");
    },

    methods: {

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

.max-height {
  height: 95vh;
}

</style>
