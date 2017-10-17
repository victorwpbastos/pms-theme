<template>
	<header class="flex v-center">
		<router-link to="/" class="flex v-center">
			<img class="m-right-10" src="../../../assets/img/brasao.png">
			<h4 class="thin">
				<%= appName.toUpperCase() %>
				<span style="color:tomato;"><%= appName.toUpperCase() %></span>
			</h4>
		</router-link>

		<span style="background:tomato;color:#ffffff;padding:0 5px;position:absolute;top:0;left:50%;transform:translateX(-50%);">{{ $store.config.ENV }}</span>

		<template v-if="$store.usuario && Object.keys($store.usuario).length > 0">
			<span class="flex v-center m-left-auto">
				<span class="thin m-right-10" style="font-size:16px;">{{ $store.usuario.nome }}</span>
				<button type="button" class="btn btn-sm btn-default" @click="logout">
					<template v-if="loading">
						<span class="fa fa-spinner fa-spin"></span> Processando
					</template>
					<template v-else>
						<span class="fa fa-sign-out"></span> Sair
					</template>
				</button>
			</span>
		</template>
	</header>
</template>

<script>
	import PermisysModel from 'models/permisys';

	export default {
		data() {
			return {
				loading: false
			};
		},

		methods: {
			async logout() {
				this.loading = true;

				try {
					await new PermisysModel().remove();

					this.$store.usuario = null;
					this.$router.push('/');
				} catch ({ responseJSON }) {
					this.$emit('message', { text: responseJSON, type: 'danger', limit: 0 });
				} finally {
					this.loading = false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	header {
		min-height: 70px;
		max-height: 70px;
		padding: 15px;

		a,
		a:active,
		a:focus,
		a:hover {
			text-decoration: none;
			color: #777;
		}

		img {
			filter: opacity(70%);
		}
	}
</style>