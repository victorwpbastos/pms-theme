<template>
	<div class="box flex">
		<div class="side flex h-center v-center">
			<img src="../../../assets/img/brasao-lg.png">
		</div>

		<div class="content flex flex-column h-center">
			<h3 class="thin" style="margin-bottom:15px;">Recuperação de Senha</h3>

			<!-- nova senha -->
			<template v-if="alterandoSenha">
				<form @submit.prevent="alterarSenha">
					<fieldset :disabled="loading">
						<div class="form-group">
							<label for="usuario" class="control-label">Usuário:</label>
							<input type="text" class="form-control" id="usuario" v-model="model.usuario" disabled>
						</div>
						<div class="form-group">
							<label for="hash" class="control-label">Hash:</label>
							<input type="text" class="form-control" id="hash" v-model="model.hash" disabled>
						</div>
						<div class="form-group">
							<label for="senha" class="control-label">Nova Senha:</label>
							<input type="password" class="form-control" id="senha" v-model="model.senha">
						</div>
						<div class="form-group">
							<label for="novaSenha" class="control-label">Repita a Nova Senha:</label>
							<input type="password" class="form-control" id="novaSenha" v-model="model.novaSenha">
						</div>

						<button type="submit" class="btn btn-info pull-right">
							<span class="fa fa-spinner fa-spin" v-if="loading"></span>
							{{ loading ? 'Processando' : 'Alterar Senha' }}
						</button>
					</fieldset>
				</form>
			</template>

			<!-- solicitação -->
			<template v-else>
				<form @submit.prevent="recuperarSenha">
					<fieldset :disabled="loading">
						<div class="form-group">
							<label for="usuario" class="control-label">Usuário:</label>
							<input type="text" class="form-control" id="usuario" v-model="model.usuario">
						</div>
						<div class="form-group">
							<label for="email" class="control-label">E-mail:</label>
							<input type="text" class="form-control" id="email" v-model="model.email">
						</div>

						<button type="submit" class="btn btn-info pull-right">
							<span class="fa fa-spinner fa-spin" v-if="loading"></span>
							{{ loading ? 'Processando' : 'Recuperar Senha' }}
						</button>
					</fieldset>
				</form>
			</template>
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

		computed: {
			alterandoSenha() {
				let query = this.$route.query;

				return query.hash !== undefined && query.idUsuario !== undefined;
			}
		},

		watch: {
			'$route': {
				handler() {
					let query = this.$route.query;

					this.model.clear();

					this.model.usuario = query.idUsuario;
					this.model.hash = query.hash;
				},

				immediate: true
			}
		},

		methods: {
			async recuperarSenha() {
				this.loading = true;

				try {
					await this.model.recuperarSenha();

					this.$emit('message', { limit: 0, text: 'Em instantes você receberá um e-mail com as instruções para recuperar a senha.' });

					this.$router.push('/');
				} catch (error) {
					this.$emit('message', { limit: 0, type: 'danger', text: 'Erro na recuperação de senha.' });
				} finally {
					this.loading = false;
				}
			},

			alterarSenha() {
				console.log(this.model);
			}
		}
	};
</script>

<style scoped>
	.box {
		width: 500px;
		padding: 0;
		background: #ffffff;
		margin: 100px auto;
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
</style>