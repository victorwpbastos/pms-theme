<template>
	<div class="messages-container">
		<transition-group name="fade">
			<div :class="`message alert alert-${m.type}`" v-for="m in messages" :key="m._id">
				<div v-html="m.text"></div>
				<span>{{ m._id }}</span>
				<button type="button" class="close" @click="closeMessage(m._id)">&times;</button>
			</div>
		</transition-group>
	</div>
</template>

<script>
	export default {
		props: ['messages'],

		data() {
			return {
				counter: this._uid
			};
		},

		watch: {
			messages() {
				window.scrollTo(0, 0);

				this.messages.forEach(message => {
					if (!message._registered) {
						this.counter++;

						message._registered = true;
						message._id = this.counter;

						if (message.limit > 0) {
							setTimeout(() => this.closeMessage(message._id), message.limit);
						}
					}
				});
			}
		},

		methods: {
			closeMessage(id) {
				let index = this.messages.findIndex(m => m._id === id);

				this.messages.splice(index, 1);
			}
		}
	};
</script>

<style scoped>
	.message {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.message:last-child {
		margin-bottom: 15px;
	}

	.fade-enter-active, .fade-leave-active {
		transition: all 200ms ease-in-out;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>