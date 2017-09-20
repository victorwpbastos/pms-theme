<template>
	<footer class="flex h-center v-center">
		{{ organization }}
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
		min-height: 60px;
		max-height: 60px;
	}
</style>