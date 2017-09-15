<template>
	<div class="wrapper box flex">
		<div class="side flex flex-column h-center v-center" style="flex:1;">
			<img src="../../../assets/img/brasao-lg.png">
			<br>
			<h3 class="thin">Autenticação</h3>
		</div>

		<div class="content flex flex-column h-center" style="flex:2;">
			<form @submit.prevent="login">
				<div class="form-group">
					<label for="usuario" class="control-label">Usuário</label>
					<input type="text" class="form-control" id="usuario" v-model="model.usuario">
					<!-- <span v-if="model.$v.usuario.$dirty && model.$v.usuario.$invalid">Preenchimento obrigatório</span> -->
				</div>
				<div class="form-group">
					<label for="senha" class="control-label">Senha</label>
					<input type="text" class="form-control" id="senha" v-model="model.senha">
					<!-- <span v-if="model.$v.senha.$dirty && model.$v.senha.$invalid">Preenchimento obrigatório</span> -->
				</div>

				<div class="flex v-center">
					<router-link to="/recuperarsenha">Esqueci minha senha</router-link>
					<button type="submit" class="btn btn-info m-left-auto">Autenticar</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import PermisysModel from 'models/permisys';

	export default {
		data() {
			return {
				model: PermisysModel.getById(123)
			};
		},

		created() {
			document.addEventListener('fetchStart', e => {
				console.log('fetch started', e);
			});

			document.addEventListener('fetchError', ({ detail }) => {
				console.log('fetch error', detail);
			});

			document.addEventListener('fetchEnd', e => {
				console.log('fetch end', e);
			});

		},

		methods: {
			login() {
				fetch('google.com').catch(() => {});
				// console.log(this.model.isDirty());
				// this.model.save();
			}
		}
	};
</script>

<style scoped>
	.wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: perspective(1px) translate(-50%, -50%); /* perspective reset blur */
		width: 500px;
		padding: 0;
	}

	.wrapper .side {
		padding: 15px;
		border-right: solid 1px #f1f1f1;
		background: #f7f7f7;
	}

	.wrapper .content {
		padding: 15px;
	}

	.wrapper .side img {
		filter: opacity(70%);
	}
</style>