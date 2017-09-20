<template>
	<div id="application-container">
		<v-header></v-header>

		<main class="container">
			<!-- messages -->
			<v-messages :messages="messages"></v-messages>

			<router-view @message="messageHandler"></router-view>
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
			messageHandler({ text = '', type = 'success' }) {
				this.messages.push({ type, text });
			}
		}
	};
</script>

<style src="assets/css/main.css"></style>