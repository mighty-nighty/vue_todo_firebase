<template>
	<transition name="fade2" appear>
		<div id="left_side" class="col-12 col-sm-5 col-md-4 col-lg-3 overflow m_height">
			<div class="container">
				<transition name="fade2" appear>
					<div class="row m-top2 m-bottom2">
						<div class="col-5 col-offset-1 col-sm-6"><h3><b>Группы</b></h3></div>
						<div class="col-5 col-offset-1 col-sm-6">
							<button class="btn btn-success addBtn" @click="showAddGroup">Добавить</button>
						</div>
					</div>
				</transition>
				<transition name="fade7" mode="out-in">
					<div class="container" v-if="showNewGroup">
						<div class="row justify-content-center">
							<input class="col-9 m-bottom2 m-top3" type="text" v-model="groupName"
							placeholder="Название группы" autofocus>
							<button class="col-11 btn btn-primary m-top" @click="addNewGroup">
								Добавить группу
							</button>
							<button class="col-11 btn btn-primary m-top2" @click="cancelAddGroup">
								Отмена
							</button>
						</div>
					</div>
				</transition>
				<transition name="fade8" mode="out-in">
					<div class="container" v-if="changeGroupScreen">
						<div class="row justify-content-center">
							<input class="col-9 m-bottom2 m-top3" type="text" v-model="groupName"
							placeholder="Новое название" autofocus>
							<button class="btn btn-primary col-11 m-top" @click="changeGroup">
								Изменить группу
							</button>
							<button class="btn btn-primary col-11 m-top2" @click="cancelAddGroup">
								Отмена
							</button>
						</div>
					</div>
				</transition>
				<transition-group name="fade9" mode="out-in">
					<div class="container"
					v-for="(group, i) in groups" :key="i"
					v-if="!showNewGroup && !changeGroupScreen">
						<div class="row">
							<div class="container btn m-top2 bt-color"
							:id="'con' + i"
							tabindex="1"
							>
								<div class="row pad">
									<a class="col-11 area t-overflow d-flex justify-content-start fontS2"
									data-toggle="collapse" :href="'#' + i" role="button" aria-expanded="false" :aria-controls="i"
									@focus="setFocus(i)"
									@blur="removeFocus(i)"
									>
										{{ group.name }}
									</a>
									<div class="col-1 pointer vert-pad2 d-flex justify-content-end"
									@click="deleteGroup(group.id)">
										<i class="fas fa-trash-alt" title="Удалить" data-toggle="modal" data-target="#askModal"></i>
									</div>
								</div>
							</div>
							<div class="container collapse def-shadow" :id="i">
									<div class="row card card-body m-top3">
										<div class="btn btn-inner col-12 m-bottom" @click="showChangeGroup(group)">
											Изменить группу
										</div>
										<div class="btn btn-inner col-12" @click="newProjectAdd(group)">
											Добавить проект
										</div>
										<div class="col-12"><hr></div>
										<div class="container">
										<div class="row height2 m-bottom b-project project-wrapper"
											v-for="(project, index) in group.projects" :index="index"
										>
											<div class="col-11 d-flex justify-content-start vert-pad3"
												:class="{ project_done: project.done }"
												@click="showProjectEditor(group, project, index)"
											>
												<span class="t-overflow">{{ project.name }}</span><br>
											</div>
											<div class="col-1 vert-pad d-flex justify-content-center"
												:class="{ trash_done: project.done }"
												@click="projectDelete(index, group)"
											>
												<i class="fas fa-trash-alt" title="Удалить"></i>
											</div>
										</div>
									</div>
									</div>
							</div>
						</div>
					</div>
				</transition-group>
			</div>
		</div>
	</transition>
</template>

<script>

  export default {
    props: ['groups'],

    data() {
      return {
        changeGroupScreen: false,
        showNewGroup: false,
        groupName: '',
        index: '',
      }
    },

//    created() {
//      firestore.collection('groups').onSnapshot(response => {
//        this.groups = [];
//        response.forEach(item => {
//          const data = {
//            id: item.id,
//            name: item.data().name,
//            projects: item.data().projects
//          };
//          this.groups.push(data);
//        })
//      })
//    },

//    watch: {
//      projectChanged: changedProject => {
//        this.selectedGroup.projects.push(changedProject);
//        firestore.collection('groups').doc(this.selectedGroup.id).set(this.selectedGroup, {merge: true});
//      },
//    },

    methods: {

      setFocus(i) {
        document.getElementById('con' + i).classList.add('focus');
      },

      removeFocus(i) {
        document.getElementById('con' + i).classList.remove('focus');
      },

      showChangeGroup(group) {
        this.selectedGroup = group;
        this.changeGroupScreen = true;
      },

      changeGroup() {
        if(this.groupName !== '') {
          this.selectedGroup.name = this.groupName;
          this.groupName = '';
          this.cancelAddGroup();
          this.$emit('changeGroupName', this.selectedGroup);
        }
      },

      deleteGroup(id) {
        this.$emit('deleteGroup', id);
      },

      projectDelete(index, group) {
        this.$emit('deleteProject', index, group)//
      },

      showProjectEditor(group, project, index) {
        this.$emit('showProjectEditor', group, project, index);
      },

      cancelAddGroup() {
        this.showNewGroup = false;
        this.changeGroupScreen = false;
      },

      showAddGroup() {
        this.showNewGroup = true;
        this.changeGroupScreen = false;
      },

      addNewGroup() {
        if(this.groupName !== '') {
          let group = {};
          group.name = this.groupName;
          group.projects = [];
          this.showNewGroup = false;
          this.groupName = '';
          this.$emit('addNewGroup', group);
          this.$emit('changeEditor');
        }
      },

      newProjectAdd(group) {
        this.selectedGroup = group;
        this.$emit('newProjectScreenOpen', this.selectedGroup);
      }

    }

  }

</script>

<style scoped>

.t-overflow {
	overflow: hidden;
	text-overflow: clip;
	-o-text-overflow: clip;
	padding: 0 6px 0 8px;
}

.focus {
	background-color: #90EE90;
}

.card {
	border-radius: 0;
}

.def-shadow {
	box-shadow: 0 10px 24px rgba(0,0,0,0.25), 0 8px 12px rgba(0,0,0,0.22);
}

.bt-color {
    transition: background-color 0.4s ease;
    display: block;
}

.bt-color:hover {
	background-color: #90EE90;
}

.bt-color:focus {
	background-color: #90EE90;
}

.height2 {
	height: 35px;
}

.pointer {
	cursor: pointer;
}

.project-wrapper {
	cursor: pointer;
	border-radius: 3px;
}

.vert-pad {
	padding: 8px 10px 0 0;
}

.vert-pad2 {
	padding: 4px 10px 0 0;
}

.vert-pad3 {
	padding: 4.8px 6px 0 6.5px;
}

.btn-inner {
	background-color: #90EE90;
	color: #007bff;
	box-shadow: 0 8px 22px rgba(0,0,0,0.25), 0 7px 12px rgba(0,0,0,0.22);
}

.btn-inner:hover {
	transition: background-color .4s ease;
	background-color: #3CB371;
	color: #FFF;
}

.m-top {
	margin-top: 6.5%;
}

.m-top3 {
	margin-top: 2%;
}

.m-bottom {
	margin-bottom: 4.5%;
}

.m-bottom2 {
	margin-bottom: 0.93rem;
}

.fontS2 {
	font-size: 1.05rem;
}

.b-project {
	background-color: #1E90FF;
	color: white;
}

.b-project:hover {
	transition: background-color 0.4s ease;
	background-color: #FFA500;
}

.project_done {
	background-color: #808080;
	text-decoration: line-through;
	pointer-events: none;
}

.trash_done {
	background-color: #808080;
}

</style>
