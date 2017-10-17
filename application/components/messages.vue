<template>
	<div class="messages-container" v-if="messages.length > 0">
		<transition-group name="fade">
			<div :class="`message alert alert-${m.type}`" v-for="m in messages" :key="m.id">
				<div v-html="m.text"></div>
				<button type="button" class="close" @click="closeMessage(m.id)">&times;</button>
			</div>
		</transition-group>
	</div>
</template>

<script>
	export default {
		props: ['messages'],

		watch: {
			messages() {
				window.scrollTo(0, 0);

				this.messages.forEach(message => {
					if (!message._registered) {
						message._registered = true;

						if (message.limit > 0) {
							setTimeout(() => this.closeMessage(message.id), message.limit);
						}
					}
				});
			}
		},

		methods: {
			closeMessage(id) {
				let index = this.messages.findIndex(m => m.id === id);

				this.messages.splice(index, 1);
			}
		}
	};
</script>

<style scoped>
	.messages-container {
		padding: 0 15px;
	}

	.message {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.fade-enter-active, .fade-leave-active {
		transition: all 200ms ease-in-out;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>