import BaseModel from 'models/base';
import { required } from 'vuelidate/lib/validators';

export default class Permisys extends BaseModel {
	constructor() {
		super(`${Config.BASE_URL}/permisys`, { usuario: '',	senha: '' });
	}

	validations() {
		return {
			usuario: { required },
			senha: { required }
		};
	}
}