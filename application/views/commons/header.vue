<template>
	<header class="flex v-center">
		<router-link to="/" class="flex v-center">
			<img class="m-right-10" src="../../../assets/img/brasao.png">
			<h4 class="thin"><%= appName.toUpperCase() %></h4>
		</router-link>

		<span style="background:tomato;color:#ffffff;padding:0 5px;position:absolute;top:0;left:50%;transform:translateX(-50%);">{{ $store.config.ENV }}</span>

		<template v-if="$store.usuario && Object.keys($store.usuario).length > 0">
			<span class="flex v-center m-left-auto">
				<span class="thin m-right-10" style="font-size:16px;">{{ $store.usuario.nome }}</span>
				<button type="button" class="btn btn-sm btn-default">
					<span class="fa fa-sign-out"></span> Sair
				</button>
			</span>
		</template>
	</header>
</template>

<script>
	export default {

	};
</script>

<style lang="scss" scoped>
	header {
		min-height: 70px;
		max-height: 70px;
		padding: 15px;
		background: #ffffff;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
		z-index: 2;

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