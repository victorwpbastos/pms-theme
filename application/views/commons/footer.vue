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
		min-height: 50px;
		max-height: 50px;
	}
</style>