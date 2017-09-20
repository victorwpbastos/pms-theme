import Vue from 'vue';
import $ from 'jquery';

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

	save(options = {}) {
		let data = JSON.stringify(this._prepareData());

		options = Object.assign({ data, method: 'POST', contentType: 'application/json; charset=UTF-8' }, options);

		if (data.id) {
			return this.update(options);
		}

		return this.fetch(this.url, options);
	}

	update(options = {}) {
		let data = JSON.stringify(this._prepareData());

		options = Object.assign({ data, method: 'PUT', contentType: 'application/json; charset=UTF-8' }, options);

		if (!data.id) {
			return this.save(options);
		}

		return this.fetch(this.url, options);
	}

	remove(options = {}) {
		options = Object.assign({ method: 'DELETE' }, options);

		return this.fetch(this.url, options);
	}

	static findAll(options = {}) {
		options = Object.assign({ method: 'GET', contentType: 'application/json; charset=UTF-8' }, options);

		return this.fetch(this.url, options);
	}

	static async find(id, options = {}) {
		let instance = new this();
		let url = id ? `${instance.url}/${id}` : `${instance.url}`;

		options = Object.assign({ method: 'GET', contentType: 'application/json; charset=UTF-8' }, options);

		try {
			let response = await instance.fetch(url, options);

			if (response) {
				instance._originalAttrs = response;

				for (let key in response) {
					instance[key] = response[key];
				}

				return instance;
			}
		} catch (error) {
			console.error(`${this.name} error [${error.statusText}]`, error);
			throw error;
		}
	}

	fetch(url, options = {}) {
		return $.ajax(url, options);
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