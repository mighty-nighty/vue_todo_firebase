<template>
  <!--<transition name="fade2" mode="out-in">-->
    <div class="container-fluid">
      <div class="row max-height">
        <transition name="fade2" mode="out-in">
          <leftSide :projectChanged = "changedProject"
                    :groups = "groups"
                    @changeGroupName = "changeGroupName"
                    @deleteGroup = "deleteGroup"
                    @addNewGroup = "addNewGroup"
                    @deleteProject = "deleteProject"
                    @newProjectScreenOpen = "openNewProjectScreen"
                    @showProjectEditor = "showProjectEditor"
          >
          </leftSide>
        </transition>
        <mainSide :addProjectScreenStatus = "newProjectScreenOpenStatus"
                  :projectInfo = "projectInfo"
                  @projectDone = "projectDone"
                  @projectChanged = "changeProject"
                  @addNewProject = "addNewProject"
                  @projectShow = "showNewProject"
                  @newProChangeState = "changeProjectState"
                  @editorChangeState = "changeEditorState"
        >
        </mainSide>
      </div>
    </div>
  <!--</transition>-->
</template>

<script>
  import firestore from '../firebaseInit'

  export default {

    data() {
      return {
        groups: [],
        selectedGroup: {},
        selectedProjectIndex: null,
        newProjectScreenOpenStatus: false,
        projectInfo: {selected: false},
        showHeader: false,
//        makeProject: {},
        changedProject: {}
      }
    },

    created() {
      firestore.collection('groups').onSnapshot(response => {
        this.groups = [];
        response.forEach(item => {
          const data = {
            id: item.id,
            name: item.data().name,
            projects: item.data().projects
          };
          this.groups.push(data);
        })
      })
    },

    mounted() {
      let star = document.getElementById('star');
      star.classList.add("rotateStart");
    },

    methods: {

      changeGroupName(changedGroup) {
        firestore.collection('groups').doc(changedGroup.id).set(changedGroup, {merge: true});
      },

      addNewGroup(newGroup) {
        firestore.collection('groups').add(newGroup);
      },

      deleteGroup(id) {
        this.$modal.show('dialog', {
          title: 'Deletion confirm',
          text: 'Delete this group?',
          buttons: [
            {
              title: 'Confirm',
              default: true,
              handler: () => {
                firestore.collection('groups').doc(id).delete().then(() => console.log('deleted'));
                this.$modal.hide('dialog');
              }
            },
            {
              title: 'Close',
              handler: () => this.$modal.hide('dialog')
            }
          ]
        })
      },

      showNewProject(newproject) {
        this.projectInfo = newproject;
        this.projectInfo.selected = true;
      },

      showProjectEditor(group, project, index) {
        this.selectedGroup = group;
        this.selectedProjectIndex = index;
        this.projectInfo = project;
        this.projectInfo.selected = true;
      },

      addNewProject(newProject) {
//        this.makeProject = newProject;
        this.selectedGroup.projects.push(newProject);
        firestore.collection('groups').doc(this.selectedGroup.id).set(this.selectedGroup, {merge: true});
      },

      changeProject(changedProject) {
        this.selectedGroup.projects.splice(this.selectedProjectIndex, 1, changedProject);
        firestore.collection('groups').doc(this.selectedGroup.id).set(this.selectedGroup, {merge: true});
      },

      projectDone(fulfilledProject) {
        this.changeProject(fulfilledProject)
      },

      openNewProjectScreen(selectedGroup) {
        this.newProjectScreenOpenStatus = true;
        this.selectedGroup = selectedGroup;
        console.warn('gro', this.selectedGroup)
      },

      changeProjectState() {
        this.newProjectScreenOpenStatus = false;
      },

      changeEditorState() {
        this.projectInfo = {selected: false};
      },

      deleteProject(index, group) {
        this.$modal.show('dialog', {
          title: 'Deletion confirm',
          text: 'Delete this project?',
          buttons: [
            {
              title: 'Confirm',
              default: true,
              handler: () => {
                group.projects.splice(index, 1);
                firestore.collection('groups').doc(group.id).set(group, {merge: true});
                this.$modal.hide('dialog');
                this.projectInfo = {selected: false};
              }
            },
            {
              title: 'Close',
              handler: () => this.$modal.hide('dialog')
            }
          ]
        })
      }

    }

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
