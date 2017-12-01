<template>
	<div>
		<div class="top-left">
			<transition-group name="fade">
				<v-toast
					v-for="t in topLeftToasts"
					:key="t.id"
					:toast="t"
				>
				</v-toast>
			</transition-group>
		</div>

		<div class="top-right">
			<v-toast
				v-for="t in topRightToasts"
				:key="t.id"
				:toast="t"
			>
			</v-toast>
		</div>

		<div class="bottom-left">
			<v-toast
				v-for="t in bottomLeftToasts"
				:key="t.id"
				:toast="t"
			>
			</v-toast>
		</div>

		<div class="bottom-right">
			<v-toast
				v-for="t in bottomRightToasts"
				:key="t.id"
				:toast="t"
			>
			</v-toast>
		</div>
	</div>
</template>

<script>
	import VToast from 'components/toast/toast';
	import 'components/toast/register';

	export default {
		components: { VToast },

		computed: {
			topLeftToasts() {
				return this.$toast.toasts.filter(t => t.position === 'TOP_LEFT');
			},

			topRightToasts() {
				return this.$toast.toasts.filter(t => t.position === 'TOP_RIGHT');
			},

			bottomLeftToasts() {
				return this.$toast.toasts.filter(t => t.position === 'BOTTOM_LEFT');
			},

			bottomRightToasts() {
				return this.$toast.toasts.filter(t => t.position === 'BOTTOM_RIGHT');
			}
		}
	};
</script>

<style>
	.top-left {
		position: fixed;
		top: 70px;
		left: 149px;
		z-index: 999999;
	}

	.top-right {
		position: fixed;
		top: 70px;
		right: 0px;
		z-index: 999999;
	}

	.bottom-left {
		position: fixed;
		bottom: 0px;
		left: 149px;
		z-index: 999999;
	}

	.bottom-right {
		position: fixed;
		bottom: 0px;
		right: 0px;
		z-index: 999999;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity  2s, transform 1s;
	}

	.fade-leave-active {
		position: absolute;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		transform: translateX(200px);
	}

	.fade-move {
  		transition: transform 3s;
	}
</style>