<template>
	<div class="wrapper">
		<div class="overlay" v-if="showPopup"></div>

		<div class="popup" v-if="showPopup">
			<p v-html="message" style="margin-bottom:15px;"></p>
			<div class="buttons">
				<button type="button" class="btn btn-sm btn-default" @click="decline">Não</button>
				<button type="button" :class="`btn btn-sm btn-${types[type] || 'info'}`" @click="confirm">Sim</button>
			</div>
		</div>

		<button type="submit" :class="`btn btn-${types[type] || 'info'}`" @click="showPopup = true" :disabled="showPopup">
			<slot></slot>
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			message: { default: 'Confirma?' },
			type: { default: 'info' }
		},

		data() {
			return {
				types: {
					'info': 'info',
					'warning': 'warning',
					'danger': 'danger',
					'success': 'success'
				},

				showPopup: false
			};
		},

		created() {
			document.addEventListener('keyup', this.manageEsc);
		},

		beforeDestroy() {
			document.removeEventListener('keyup', this.manageEsc);
		},

		methods: {
			manageEsc(e) {
				if (e.keyCode === 27) {
					this.showPopup = false;
				}
			},

			decline() {
				this.$emit('decline');
				this.showPopup = false;
			},

			confirm() {
				this.$emit('confirm');
				this.showPopup = false;
			}
		}
	};
</script>

<style scoped>
	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.25);
		z-index: 1;
	}

	.wrapper {
		display: inline-block;
		position: relative;
	}

	.popup {
		position: absolute;
		bottom: 45px;
		left: 50%;
		transform: translateX(-50%);
		display: inline-block;
		white-space: nowrap;
		background: #ffffff;
		padding: 15px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
		border-radius: 3px;
		text-align: center;
		min-width: 200px;
		z-index: 2;
	}

	.popup:after {
		content: '';
		width: 10px;
		height: 10px;
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: rotate(45deg) translateX(-50%);
		box-shadow: 2px 2px 2px -1px rgba(0, 0, 0, 0.25);
		background: #ffffff;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>