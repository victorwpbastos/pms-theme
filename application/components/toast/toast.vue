<template>
	<div class="toast">
		{{toast.text}}
		<button type="button" class="close" @click="close">&times;</button>
	</div>
</template>

<script>
	export default {
		props: ['toast'],

		methods: {
			close() {
				this.$toast.remove(this.toast.id);
			}
		}
	};
</script>

<style>
	.toast {
		padding: 10px;
		border: 1px solid #000;
		background-color: #fff;
	}
</style>