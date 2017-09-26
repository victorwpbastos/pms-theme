<template>
	<footer class="flex v-center">
		<span>{{ organization }}</span>
		<span>Versão {{ version }}</span>
	</footer>
</template>

<script>
	import pkg from 'package.json';

	export default {
		data() {
			return {
				organization: pkg.organization,
				version: pkg.version
			};
		}
	};
</script>

<style scoped>
	footer {
		justify-content: space-between;
		min-height: 60px;
		max-height: 60px;
		padding: 0 15px;
	}
</style>