<template>
	<v-masked-input
		class="form-control"
		:mask="innerMask"
		v-model="maskedValue"
		v-bind="$attrs"
		@input="emitInput"
	>
	></v-masked-input>
</template>

<script>
	import VMaskedInput, { conformToMask } from 'vue-text-mask';

	export default {
		components: { VMaskedInput },

		props: {
			value: { default: '' },
			mask: { default: '' },
			emitMasked: { default: true },
			emitPlaceholder: { default: false },
			placeholderChar: { default: '_' }
		},

		data() {
			return {
				innerMask: [],

				maskedValue: '',

				charMap: {
					'#': /[0-9]/,
					'a': /[a-z]/,
					'A': /[A-Z]/,
					'@': /[a-zA-Z]/,
					'*': /./
				}
			};
		},

		watch: {
			value(value) {
				if (value) {
					this.maskedValue = conformToMask(value, this.innerMask, this.$attrs).conformedValue;
					this.emitInput(this.maskedValue);
				}
			}
		},

		created() {
			this.normalizeMask();

			this.maskedValue = this.value;
		},

		methods: {
			normalizeMask() {
				if (this.mask && typeof(this.mask) === 'string') {
					let arrMask = this.mask.split('');

					this.innerMask = arrMask.map((char, index) => {
						let escaped = arrMask[index - 1] === '\\';

						if (char === '\\') {
							return null;
						} else if (escaped) {
							return char;
						} else {
							return this.charMap[char] || char;
						}
					}).filter(char => char !== null);
				} else {
					this.innerMask = this.mask;
				}
			},

			unmaskit(value) {
				let arrMask = this.mask;

				if (typeof(this.mask) === 'string') {
					arrMask =  this.mask.split('');
				}

				return arrMask.map((char, index) => {
					if (char instanceof RegExp) {
						return value[index];
					} else if (this.charMap[char] && this.charMap[char].test(value[index])) {
						return value[index];
					}
				}).join('');
			},

			emitInput(value) {
				let rePlaceholderChar = new RegExp(this.placeholderChar, 'g');

				if (!this.emitMasked) {
					value = this.unmaskit(value);
				}

				if (!this.emitPlaceholder) {
					value = value.replace(rePlaceholderChar, '');
				}

				this.$emit('input', value);
			}
		}
	};
</script>