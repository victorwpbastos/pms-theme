<template>
	<select
		class="form-control"
		@change="emitChange"
	>
		<slot></slot>
	</select>
</template>

<script>
	export default {
		props: {
			value: { default: null }
		},

		mounted() {
			this.setInitialValue();
		},

		updated() {
			this.setInitialValue();
		},

		methods: {
			emitChange(e) {
				let selectedOptions = [].slice.call(e.target.options).filter(o => o.selected === true);
				let values = selectedOptions.map(option => {
					return option._value !== undefined ? option._value : option.value;
				});

				if (e.target.multiple) {
					this.$emit('input', values);
				} else {
					this.$emit('input', values[0]);
				}
			},

			setInitialValue() {
				if (this.value && this.value.length > 0) {
					let options = [].slice.call(this.$el.options);

					options.forEach(option => {
						option.selected = false;

						if (this.$el.multiple) {
							let values = this.value.map(v => v.toString());

							option.selected = values.includes(JSON.stringify(option._value));
						} else {
							if (JSON.stringify(option._value) === JSON.stringify(this.value)) {
								option.selected = true;
							}
						}
					});
				}
			}
		}
	};
</script>