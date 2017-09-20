<template>
	<header class="flex v-center">
		<router-link to="/" class="flex v-center">
			<img class="m-right-10" src="../../../assets/img/brasao.png">
			<h3 class="thin">THEME <span style="color:salmon;">{{ $store.config.ENV }}</span></h3>
		</router-link>

		<v-menu v-if="$store.usuario && Object.keys($store.usuario).length > 0"></v-menu>
	</header>
</template>

<script>
	import VMenu from './menu';

	export default {
		components: { VMenu },

		data() {
			return {
				env: Config.ENV
			};
		},

		mounted() {
			this.manageBorder();

			document.addEventListener('scroll', this.manageBorder);
		},

		beforeDestroy() {
			document.removeEventListener('scroll', this.manageBorder);
		},

		methods: {
			manageBorder() {
				if (window.scrollY > 0) {
					this.$el.classList.add('bordered');
				} else {
					this.$el.classList.remove('bordered');
				}
			}
		}
	};
</script>

<style scoped>
	header {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		justify-content: space-between;
		min-height: 80px;
		max-height: 80px;
		padding: 15px;
		background: #ffffff;
		z-index: 2;
	}

	header a,
	header a:active,
	header a:focus,
	header a:hover {
		text-decoration: none;
		color: #777;
	}

	header img {
		filter: opacity(70%);
	}

	header.bordered {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
	}
</style>