import Vue from 'vue';

export default class Model {
	constructor(url, attrs) {
		this.url = url;
		this._originalAttrs = attrs;

		for (let key in attrs) {
			this[key] = attrs[key];
		}

		this._setupValidations();
	}

	validations() {
		return {};
	}

	save() {
		// return new Promise((resolve, reject) => {

		// });
		console.log(this.url, this._prepareData());
	}

	update() {

	}

	remove() {

	}

	static getAll() {
		// console.log('fetch all');
	}

	static getById(id) {
		let instance = new this();
		let attrs = { id: id, usuario: 'vbastos', senha: '123456' };

		for (let key in attrs) {
			instance[key] = attrs[key];
		}

		return instance;
	}

	_setupValidations() {
		let hasValidations = Object.keys(this.validations()).length > 0;

		if (hasValidations) {
			let self = this;
			let fakeView = new Vue({
				data() {
					return self;
				},

				validations: self.validations
			});

			this.$v = fakeView.$v;
		}
	}

	_prepareData() {
		let data = {};

		for (let key in this._originalAttrs) {
			data[key] = this[key];
		}

		return data;
	}
}