<template>

<div class="container mar-top">
	<form action="">
		<div class="row justify-content-center">
			<input type="text" class="col-9 col-md-6" placeholder="E-mail"></input>
		</div>
		<div class="row justify-content-center marg-top">
			<input type="text" class="col-9 col-md-6" placeholder="Пароль"></input>
		</div>
		<div class="row justify-content-center mar-top3">
			<button type="submit" class="btn btn-primary col-6 col-md-3" @click.prevent="">Вход</button>
		</div>
	</form>
	<div class="row justify-content-center marg-top">
		<button class="btn btn-primary col-6 col-md-3" @click="showOff">Отмена</button>
	</div>
	<div class="row justify-content-center mar-top3">
		<a href="" @click.prevent="">Регистрация</a>
	</div>
</div>

</template>

<script>

export default {

	data() {
		return {

		}
	},

	methods: {

		showOff() {
			this.$emit('showoff')
		}

	}

}

</script>

<style scoped>

.mar-top3 {
	margin-top: 4.8%;
}

.marg-top {
	margin-top: 1.6%;
}

.mar-top {
	margin-top: 14%;
}

</style>
