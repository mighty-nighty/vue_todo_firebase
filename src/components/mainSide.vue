<template>
	<transition name="fade2" appear>
	<div class="col-12 col-sm-7 col-md-8 col-xl-9 desktop overflow full-height">
		<transition name="fade3" mode="out-in">
			<div class="container custom-height" v-if="state === 'A'">
				<div class="row">
					<div class="col-12 padd def-shadow mainside-block">
						<div class="block-title">
							Нажмите на группу<br>чтобы добавить новый проект
						</div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade4" mode="out-in">
			<div class="container def-shadow mainside-block" id="newPro" v-if="state === 'B'">
				<div class="row">
					<div class="col-9 col-md-5 m-bottom m-top block-title">Новый проект</div>
				</div>
				<div class="row justify-content-center">
					<input type="text" class="col-9 col-md-7" v-model="projectName"
					placeholder="Название проекта" required autofocus>
				</div>
				<div class="row justify-content-center">
					<input type="text" class="col-9 col-md-7 m-top2 m-bottom" v-model="projectDescrip"
					required placeholder="Описание проекта">
				</div>
				<div class="row justify-content-center">
					<button class="col-5 col-md-3 btn btn-primary "
					@click="makeNewProject(projectName, projectDescrip)">
						Добавить
					</button>
				</div>
				<div class="row justify-content-center">
					<button class="col-5 col-md-3 btn btn-primary col-3 m-top2 m-bottom" @click="state = 'A'">
						Отмена
					</button>
				</div>
			</div>
		</transition>
		<transition name="fade5" mode="out-in">
			<div class="container def-shadow mainside-block" v-if="state === 'C' && projectInfo.selected">
				<div class="row justify-content-center">
					<div class="col-12 font-s3 def-text-shadow">{{ projectInfo.name }}</div>
					<div class="col-12 font-s2">{{ projectInfo.descrip }}</div>
					<button class="col-4 col-md-3 btn btn-primary m-top" @click="state = 'D'">Изменить</button>
					<button class="col-4 col-md-3 btn btn-primary m-top" @click="projectDone">Выполнено</button>
				</div>
				<div class="mt-4"></div>
				<ul class="container mb-4">
					<li class="row justify-content-center m-top" v-for="(task, index) in projectInfo.tasks" :key="index">
						<input type="checkbox"
									 v-model="task.done"
									 :id="task.name"
									 :class="{ checked: task.done }"
									 class="col-2 align-self-start"
									 @click="taskIsDone(index)">
						<label :for="task.name" class="col-2 align-self-start" :class="{ done: task.done }"></label>
						<span class="col-6 align-self-center" :class="{ done: task.done }">
							{{ task.name }}
						</span>
						<button class="col-2 align-self-end btn btn-danger d-flex justify-content-center font-s8"
										@click="removeTask(index)">
							Удалить
						</button>
					</li>
				</ul>

				<div class="container m-top m-bottom" v-if="taskState === 'B'">
					<div class="row justify-content-center">
						<input class="col-10 col-md-6 m-right" id="in1" type="text" v-model="taskName"
						placeholder="Название задачи" autofocus>
						<button class="btn col-3 col-md-1 white-btn" @click="addTask">OK</button>
						<button class="btn col-3 col-md-1 white-btn" @click="taskState = 'A'">X</button>
					</div>
				</div>

				<div class="row justify-content-center m-top">
					<button class="col-6 col-sm-4 btn btn-primary" @click="taskState = 'B'">
						Добавить задачу
					</button>
				</div>

				<div class="row justify-content-center m-top2">
					<button class="col-6 col-sm-4 btn btn-warning mb-3"
					@click="closeEditor">
						Закрыть
					</button>
				</div>
			</div>
		</transition>
		<transition name="fade6" mode="out-in">
			<div class="container def-shadow m-top3" id="changePro" v-if="state === 'D'">
				<div class="row">
					<h3 class="col-9 col-md-7 col-lg-5 m-bottom m-top">Изменить проект</h3>
				</div>
				<div class="row justify-content-center">
					<input type="text" class="col-9 col-md-7 col-offset-2" v-model="projectName"
					placeholder="Новое название проекта" required autofocus>
				</div>
				<div class="row justify-content-center">
					<input type="text" class="col-9 col-md-7 col-offset-2 m-top2 m-bottom"
					v-model="projectDescrip" required placeholder="Новое описание проекта">
				</div>
				<div class="row justify-content-center">
					<button class="col-5 col-md-3 btn btn-primary" @click="changeProject">Изменить</button>
				</div>
				<div class="row justify-content-center">
					<button class="col-5 col-md-3 btn btn-primary m-top2 m-bottom" @click="state = 'C'">Отмена</button>
				</div>
			</div>
		</transition>
	</div>
	</transition>
</template>

<script>

export default {
	props: ['addProjectScreenStatus', 'projectInfo'],

	data() {
		return {
			ind: '',
			projectName: '',
			projectDescrip: '',
			taskName: '',
			state: 'A',
			taskState: 'A',
		}
	},

  mounted() {
//    if (this.projectInfo.selected && this.projectInfo.tasks.length) {
//      this.projectInfo.tasks.forEach(task => {
//        if (task.done) {
//          let box = document.getElementById(task.name);
//        }
//      })
//    }
  },

	watch: {

	  projectInfo: function() {
			if(this.projectInfo.selected) {
				this.state = 'C';
				this.taskState = 'A';
			}
		},

    addProjectScreenStatus: function(status) {
			if(status) {
				this.state = 'B';
				this.$emit('newProChangeState');
				this.$emit('editorChangeState');
			}
		}

	},

	methods: {

		projectDone() {
			this.projectInfo.done = true;
			this.state = 'A';
			this.$emit('projectDone', this.projectInfo)
		},

		changeProject() {
			if(this.projectName !== '' && this.projectDescrip !== '') {
				this.projectInfo.name = this.projectName;
				this.projectInfo.descrip = this.projectDescrip;
				this.projectName = '';
				this.projectDescrip = '';
				this.state = 'A';
        this.$emit('editorChangeState');
        this.$emit('projectChanged', this.projectInfo);
			}
		},

		closeEditor() {
			this.state = 'A';
			this.$emit('editorChangeState');
		},

		removeTask(index) {
			this.projectInfo.tasks.splice(index, 1);
			this.projectInfo.tasknames.splice(index, 1);
			this.$emit('projectChanged', this.projectInfo);
		},

		getDone(task) {
			task.done = !task.done;
		},

		addTask() {
			let taskNames = this.projectInfo.tasknames;

			if(this.taskName && taskNames.indexOf(this.taskName) === -1) {
				taskNames.push(this.taskName);
				this.projectInfo.tasks.push({name: this.taskName, done: false});
        this.$emit('projectChanged', this.projectInfo);
				this.taskName = '';
				this.taskState = 'A';
			}
			else if(this.taskName && taskNames.indexOf(this.taskName) !== -1) {
        this.taskName = '';
        this.$modal.show('dialog', {
          title: 'Предупреждение',
          text: 'Вы уже вносили задачу с таким названием!',
          buttons: [
            {
              title: 'Ok',
              default: true,
              handler: () => {
                this.$modal.hide('dialog');
              }
            }
          ]
        })
			}
			else {
        this.$modal.show('dialog', {
          title: 'Предупреждение',
          text: 'Введите название задачи',
          buttons: [
            {
              title: 'Ok',
              default: true,
              handler: () => {
                this.$modal.hide('dialog');
              }
            }
          ]
        })
      }
		},

    taskIsDone(index) {
      this.projectInfo.tasks[index].done = !this.projectInfo.tasks[index].done;
      this.$emit('projectChanged', this.projectInfo);
		},

		makeNewProject(name, description) {
			if(this.name !== '' && this.description !== '') {
				let newProject = {};
				newProject.name = name;
				newProject.descrip = description;
				newProject.tasks = [];
				newProject.tasknames = [];
				newProject.done = false;
				newProject.selected = false;
				this.$emit('addNewProject', newProject);
				this.$emit('projectShow');
				this.projectName = '';
				this.projectDescrip = '';
				this.state = 'C';
			}
		}
	}
}

</script>

<style scoped>

input[type="checkbox"] { display: none; }
input[type="checkbox"] + label {
  display: block;
  height: 20px;
  position: relative;
  padding-left: 35px;
  font: 14px/20px 'Open Sans', Arial, sans-serif;
  color: #1E90FF;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
input[type="checkbox"] + label:before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border: 2px solid #1E90FF;
  border-radius: 3px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: .9;
  -webkit-transition: all .12s, border-color .08s;
  transition: all .12s, border-color .08s;
}
input[type="checkbox"]:checked + label:before {
  width: 10px;
  top: -5px;
  left: 5px;
  border-radius: 0;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.m-right {
	margin-right: 5px;
}

.overflow {
	overflow: auto;
	-moz-overflow: auto;
}

.def-text-shadow {
	text-shadow: 4px 8px 16px rgba(0,0,0,0.3);
}

.def-shadow {
	background-color: rgba(255,255,255,0.9);
	border-radius: 5px;
	box-shadow: 0 10px 28px rgba(0,0,0,0.25), 0 8px 12px rgba(0,0,0,0.26);
}

.done {
	text-decoration: line-through;
	color: rgba(112, 128, 144, 0.65);
}

.font-s2 {
	font-size: 1.45rem;
}

.font-s3 {
	font-size: 2rem;
}

.custom-height {
	height: 1px;
}

.m-top {
	margin-top: 1.8%;
}

.m-top2 {
	margin-top: 2%;
}

.m-top3 {
	margin-top: 8.6%;
}

.m-bottom {
	margin-bottom: 3.3%;
}

</style>
