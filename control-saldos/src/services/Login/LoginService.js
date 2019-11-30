import {HttpRequest, ReactLocalStorageService} from '../../settings/Libs/Libs';

class LoginService {
	
	static Login = (form) => {
		let params = {
			username: form.username,
			password: form.password,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Log_In', params, {authentication: false}).then((response) => {
				let Usr = {
					token: response.data.token || '',
					expiracion: response.data.expiracion || '',
					username: response.data.username || '',
					id_cat_sexo: response.data.id_cat_sexo || '',
					password: response.data.password || '',
					id_usuario: response.data.id_usuario || '',
					nombre: response.data.nombre || '',
					apellido_paterno: response.data.apellido_paterno || '',
					apellido_materno: response.data.apellido_materno || '',
					id_rol: response.data.id_rol || '',
				};
				ReactLocalStorageService.set('Usr', Usr);
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
}

export default LoginService;
