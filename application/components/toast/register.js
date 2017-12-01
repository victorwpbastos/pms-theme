import Vue from 'vue';

Vue.prototype.$toast = new Vue({
	data() {
		return {
			toasts: []
		};
	},

	methods: {
		add(toast) {
			toast.id = Date.now();
			if (!toast.position) {
				toast.position = 'BOTTOM_LEFT';
			}
			this.toasts.push(toast);
			return toast.id;
		},

		remove(id) {
			let index = this.toasts.findIndex(t => t.id === id);
			this.toasts.splice(index, 1);
		}
	}
});