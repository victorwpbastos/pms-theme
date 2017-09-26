<template>
	<div class="box flex">
		<div class="side flex h-center v-center">
			<img src="../../../assets/img/brasao-lg.png">
		</div>

		<div class="content flex flex-column h-center">
			<h3 class="thin" style="margin-bottom:15px;">Autenticação</h3>
			<form @submit.prevent="login">
				<fieldset :disabled="loading">
					<div class="form-group">
						<label for="usuario" class="control-label">Usuário:</label>
						<input type="text" class="form-control" id="usuario" v-model="model.usuario">
					</div>
					<div class="form-group">
						<label for="senha" class="control-label">Senha:</label>
						<input type="text" class="form-control" id="senha" v-model="model.senha">
					</div>

					<div class="flex v-center">
						<router-link to="/recuperarsenha">Esqueci minha senha</router-link>
						<button type="submit" class="btn btn-info m-left-auto">
							<span class="fa fa-spinner fa-spin" v-if="loading"></span>
							{{ loading ? 'Processando' : 'Autenticar' }}
						</button>
					</div>
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
			async login() {
				this.loading = true;

				try {
					await this.model.save();

					this.$router.push(this.$route.query.redirect || '/');
				} catch (error) {
					this.$emit('message', { type: 'danger', text: 'Erro no login.' });
				} finally {
					this.loading = false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.box {
		width: 500px;
		padding: 0;
		background: #ffffff;
		margin: 100px auto;

		.side {
			width: 30%;
			padding: 15px;
			border-right: solid 1px #f1f1f1;
			background: #f7f7f7;

			img {
				filter: opacity(70%);
				margin-bottom: 5px;
			}
		}

		.content {
			width: 70%;
			padding: 15px;
		}
	}
</style>