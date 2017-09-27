<template>
	<div class="wrapper" ref="wrapper">
		<div class="overlay" v-if="showPopup"></div>

		<div class="popup" v-if="showPopup">
			<p v-html="message" style="margin-bottom:15px;"></p>
			<div class="buttons">
				<button type="button" class="btn btn-sm btn-default" @click="decline">Não</button>
				<button type="button" :class="`btn btn-sm ${type || 'btn-info'}`" @click="confirm">Sim</button>
			</div>
		</div>

		<button type="submit" ref="button" v-bind="$attrs" :class="`btn ${type}`" @click="showPopup = true">
			<slot></slot>
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			message: { default: 'Confirma?' }
		},

		data() {
			return {
				type: '',

				showPopup: false
			};
		},

		created() {
			document.addEventListener('keyup', this.manageEsc);

			this.manageClasses();
			this.manageStyles();
		},

		beforeDestroy() {
			document.removeEventListener('keyup', this.manageEsc);
		},

		methods: {
			manageClasses() {
				this.$nextTick(() => {
					let inheritedClasses = [].slice.call(this.$refs.wrapper.classList);

					this.$refs.wrapper.className = inheritedClasses[0];

					inheritedClasses.shift(); // remove a primeira classe

					if (inheritedClasses.includes('btn-info')) {
						this.type = 'btn-info';
					}

					if (inheritedClasses.includes('btn-warning')) {
						this.type = 'btn-warning';
					}

					if (inheritedClasses.includes('btn-danger')) {
						this.type = 'btn-danger';
					}

					if (inheritedClasses.includes('btn-success')) {
						this.type = 'btn-success';
					}

					if (
						!inheritedClasses.includes('btn-default') &&
						!inheritedClasses.includes('btn-info') &&
						!inheritedClasses.includes('btn-warning') &&
						!inheritedClasses.includes('btn-danger') &&
						!inheritedClasses.includes('btn-success') &&
						!inheritedClasses.includes('btn-link')
					) {
						this.type = 'btn-info';
					}

					inheritedClasses.forEach(c => this.$refs.button.classList.add(c));
				});
			},

			manageStyles() {
				this.$nextTick(() => {
					let inheritedStyles = this.$vnode.data.staticStyle;

					this.$refs.wrapper.removeAttribute('style');

					for (let prop in inheritedStyles) {

						this.$refs.button.style[prop] = inheritedStyles[prop];
					}
				});
			},

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