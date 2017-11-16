<template>
	<div class="wrapper" ref="wrapper">
		<div class="overlay" v-if="showPopup"></div>

		<div :class="`popup popup-${position}`" v-if="showPopup">
			<div v-html="message" style="margin-right:15px;"></div>
			<span class="buttons">
				<button type="button" class="btn btn-sm btn-default" style="margin-right:5px;" @click="decline">Não</button>
				<button type="button" :class="`btn btn-sm ${btnClass || 'btn-info'}`" ref="btn-confirm" @click="confirm">Sim</button>
			</span>
		</div>

		<button :type="type" ref="button" v-bind="$attrs" :class="`btn ${btnClass}`" @click="showPopup = true">
			<slot></slot>
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			message: { default: 'Confirma?' },
			position: { default: 'left' },
			type: { default: 'submit' }
		},

		data() {
			return {
				btnClass: '',

				showPopup: false
			};
		},

		watch: {
			showPopup() {
				if (this.showPopup) {
					this.$nextTick(() => {
						this.$refs['btn-confirm'].focus();
					});
				}
			}
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
						this.btnClass = 'btn-info';
					}

					if (inheritedClasses.includes('btn-warning')) {
						this.btnClass = 'btn-warning';
					}

					if (inheritedClasses.includes('btn-danger')) {
						this.btnClass = 'btn-danger';
					}

					if (inheritedClasses.includes('btn-success')) {
						this.btnClass = 'btn-success';
					}

					if (
						!inheritedClasses.includes('btn-default') &&
						!inheritedClasses.includes('btn-info') &&
						!inheritedClasses.includes('btn-warning') &&
						!inheritedClasses.includes('btn-danger') &&
						!inheritedClasses.includes('btn-success') &&
						!inheritedClasses.includes('btn-link')
					) {
						this.btnClass = 'btn-info';
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
	.wrapper {
		display: inline-block;
		position: relative;
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

	/* popup */
	.popup {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		white-space: nowrap;
		background: #ffffff;
		padding: 10px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
		border-radius: 3px;
		min-width: 200px;
		z-index: 200;
	}

	.popup-top {
		left: 50%;
		bottom: 100%;
		transform: translateX(-50%);
		margin-bottom: 10px;
	}

	.popup-bottom {
		left: 50%;
		top: 100%;
		transform: translateX(-50%);
		margin-top: 10px;
	}

	.popup-left {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-right: 10px;
	}

	.popup-right {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 10px;
	}

	/* popup arrow */
	.popup:after {
		content: '';
		width: 10px;
		height: 10px;
		position: absolute;
		background: #ffffff;
	}

	.popup-top:after {
		left: 50%;
		bottom: -5px;
		transform: translateX(-50%) rotate(45deg);
		box-shadow: 2px 2px 2px -1px rgba(0, 0, 0, 0.25);
	}

	.popup-bottom:after {
		left: 50%;
		top: -5px;
		transform: translateX(-50%) rotate(45deg);
		box-shadow: -2px -2px 2px -1px rgba(0, 0, 0, 0.25);
	}

	.popup-left:after {
		right: -5px;
		top: 50%;
		transform: translateY(-50%) rotate(-45deg);
		box-shadow: 2px 2px 2px -1px rgba(0, 0, 0, 0.25);
	}

	.popup-right:after {
		left: -5px;
		top: 50%;
		transform: translateY(-50%) rotate(-45deg);
		box-shadow: -2px -2px 2px -1px rgba(0, 0, 0, 0.25);
	}

	/* btn-link adjustments */
	.btn-link {
		vertical-align: baseline;
	}

	.btn-link:focus {
		outline: none;
	}
</style>