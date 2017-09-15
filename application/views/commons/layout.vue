<template>
	<div id="application-container">
		<v-header></v-header>

		<main class="container">
			<router-view></router-view>
		</main>

		<v-footer></v-footer>
	</div>
</template>

<script>
	import VHeader from 'views/commons/header';
	import VFooter from 'views/commons/footer';

	export default {
		components: { VHeader, VFooter }
	};
</script>

<style src="assets/css/main.css"></style>