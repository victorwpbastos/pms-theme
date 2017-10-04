<template>
	<div id="application-container">
		<v-header></v-header>

		<main>
			<aside>
				<v-menu></v-menu>
			</aside>

			<div style="flex:1;">
				<!-- messages -->
				<v-messages :messages="messages"></v-messages>

				<div class="overlay" v-if="showLogin">
					<v-login @success="retry" @message="messageHandler"></v-login>
				</div>

				<router-view @message="messageHandler"></router-view>
			</div>
		</main>

		<v-footer></v-footer>
	</div>
</template>

<script>
	import $ from 'jquery';
	import VHeader from 'views/commons/header';
	import VMenu from 'views/commons/menu';
	import VFooter from 'views/commons/footer';
	import VLogin from 'views/permisys/login';
	import VMessages from 'components/messages';

	export default {
		components: { VHeader, VMenu, VFooter, VLogin, VMessages },

		data() {
			return {
				messages: [],

				showLogin: false,

				lastRequest: {
					promise: null,
					options: null
				}
			};
		},

		created() {
			$.ajaxPrefilter((options, originalOptions, jqXHR) => {
				let dfd = $.Deferred();

				if (options.resolved) {
					this.showLogin = false;

					return;
				}

				jqXHR.done(dfd.resolve);

				jqXHR.fail(() => {
					if (jqXHR.status === 401) {
						Object.assign(originalOptions, { resolved: true });

						this.lastRequest = { promise: dfd, options: originalOptions };

						this.showLogin = true;
					} else {
						dfd.reject(jqXHR);
					}
				});

				return dfd.promise(jqXHR);
			});
		},

		methods: {
			retry() {
				$.ajax(this.lastRequest.options)
					.then(this.lastRequest.promise.resolve, this.lastRequest.promise.reject);
			},

			messageHandler({ text = '', type = 'info', limit = 5000 }) {
				setTimeout(() => { // para assegurar que o getTime sempre retornará um valor diferente
					this.messages.push({ id: new Date().getTime(), type, text, limit });
				}, 0);
			}
		}
	};
</script>

<style lang="scss" scoped>
	main {
		display: flex;
		padding: 15px;
		min-height: calc(100% - 130px);

		aside {
			min-width: 200px;
			max-width: 200px;
			margin-right: 15px;
		}
	}

	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.25);
		z-index: 100;
	}
</style>