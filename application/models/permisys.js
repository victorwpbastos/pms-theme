import BaseModel from 'models/base';
import { required } from 'vuelidate/lib/validators';

export default class Permisys extends BaseModel {
	constructor() {
		super(`${Config.BASE_URL}/permisys`, { usuario: '',	senha: '', email: '', hash: '', novaSenha: '' });
	}

	validations() {
		return {
			usuario: { required },
			email: { required },
			hash: { required },
			senha: { required },
			novaSenha: { required }
		};
	}

	recuperarSenha() {
		return new Promise(resolve => {
			setTimeout(resolve, 3000);
		});
	}
}