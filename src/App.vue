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
            <button class="btn white login" @click="signInShow = true">Войти</button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade2" appear>
      <div class="container-fluid">
        <div class="row max-height">
          <signIn v-if="signInShow"
            @showoff="signInShow = false"
          >
          </signIn>
          <leftSide v-if="signInShow == false"
            :addNewProject = "makeProject"
            :projectChanged = "changedProject"
            @deleteProject = "changeEditorState"
            @newProjectAdd = "newProjectScreen"
            @projectEditor = "proEditorOn"
          >
          </leftSide>
          <mainSide v-if="signInShow == false"
            :addNewProject = "newProjectState"
            :projData = "projectData"
            @projectChanged = "changeProject"
            @addProject = "addNewPro"
            @projectShow = "showNewProject"
            @newProChangeState = "changeProjectState"
            @editorChangeState = "changeEditorState"
          >
          </mainSide>
        </div>
      </div>
    </transition>
    <v-dialog/>
  </div>
</template>

<script>

  export default {
    name: 'app',

    data() {
      return {
        signInShow: false,
        newProjectState: false,
        projectData: {selected: false},
        showHeader: false,
        makeProject: {},
        changedProject: {}
      }
    },

    mounted() {
      let star = document.getElementById('star');
      star.classList.add("rotateStart");
    },

    methods: {

      showNewProject(newproject) {
        this.projectData = newproject;
        this.projectData.selected = true;
      },

      proEditorOn(selected_project) {
        this.projectData = selected_project;
        this.projectData.selected = true;
      },

      addNewPro(newproject) {
        this.makeProject = newproject;
      },

      changeProject(changedProject) {
        this.changedProject = changedProject;
      },

      newProjectScreen() {
        this.newProjectState = true;
      },

      changeProjectState() {
        this.newProjectState = false;
      },

      changeEditorState() {
        this.projectData = {selected: false};
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

.max-height {
  height: 95vh;
}

</style>
