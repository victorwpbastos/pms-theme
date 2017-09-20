<template>
	<div class="box flex">
		<div class="side flex h-center v-center">
			<img src="../../../assets/img/brasao-lg.png">
		</div>

		<div class="content flex flex-column h-center">
			<h3 class="thin" style="margin-bottom:15px;">Recuperação de Senha</h3>
			<form @submit.prevent="login">
				<fieldset :disabled="loading">
					<div style="display:table;width:100%;">
						<div class="form-group">
							<label for="usuario" class="control-label">Usuário:</label>
							<input type="text" class="form-control" id="usuario" v-model="model.usuario">
						</div>
						<div class="form-group">
							<label for="email" class="control-label">E-mail:</label>
							<input type="text" class="form-control" id="email" v-model="model.email">
						</div>
					</div>

					<button type="submit" class="btn btn-info pull-right">
						<span class="fa fa-spinner fa-spin" v-if="loading"></span>
						{{ loading ? 'Processando' : 'Recuperar' }}
					</button>
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script>
	import PermisysModel from 'models/permisys';

	export default {
		data() {
			return {
				model: new PermisysModel(),

				loading: false
			};
		},

		methods: {
			login() {
				this.loading = true;

				this.model.login().then(this.loading = false);
			}
		}
	};
</script>

<style scoped>
	.box {
		width: 500px;
		padding: 0;
		background: #ffffff;
		margin: auto;
	}

	.box .side {
		width: 30%;
		padding: 15px;
		border-right: solid 1px #f1f1f1;
		background: #f7f7f7;
	}

	.box .side img {
		filter: opacity(70%);
		margin-bottom: 5px;
	}

	.content {
		width: 70%;
		padding: 15px;
	}

	.content form .form-group {
		display: table-row;
	}

	.content form label {
		display: table-cell;
		width: 1px;
		text-align: right;
		padding-right: 5px;
	}

	.content form input {
		display: table-cell;
		margin-bottom: 15px;
	}
</style>