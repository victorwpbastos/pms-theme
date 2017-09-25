<template>
	<div id="application-container">
		<v-header></v-header>

		<main>
			<div class="container">
				<!-- messages -->
				<v-messages :messages="messages"></v-messages>

				<router-view @message="messageHandler"></router-view>
			</div>
		</main>

		<v-footer></v-footer>
	</div>
</template>

<script>
	import VHeader from 'views/commons/header';
	import VFooter from 'views/commons/footer';
	import VMessages from 'components/messages';

	export default {
		components: { VHeader, VFooter, VMessages },

		data() {
			return {
				messages: []
			};
		},

		methods: {
			messageHandler({ text = '', type = 'info', limit = 5000 }) {
				setTimeout(() => { // para assegurar que o getTime sempre retornará um valor diferente
					this.messages.push({ id: new Date().getTime(), type, text, limit });
				}, 0);
			}
		}
	};
</script>

<style src="assets/css/main.css"></style>