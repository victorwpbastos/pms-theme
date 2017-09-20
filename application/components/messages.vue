<template>
	<div class="messages-container">
		<transition-group name="fade">
			<div :class="`message alert alert-${m.type}`" v-for="(m, index) in messages" :key="m._id">
				<div v-html="m.text"></div>
				<button type="button" class="close" @click="closeMessage(index)">&times;</button>
			</div>
		</transition-group>
	</div>
</template>

<script>
	export default {
		props: ['messages'],

		watch: {
			messages() {
				this.messages.forEach(m => m._id = m._id || new Date().getTime());
			}
		},

		methods: {
			closeMessage(index) {
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

	.fade-enter-active, .fade-leave-active {
		transition: all 200ms ease-in-out;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>