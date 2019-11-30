import {HttpRequest} from '../../settings/Libs/Libs';

class UsuarioService {
	
	static all = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static show = (item) => {
		let params = {
			id_usuario: item.id_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Xid', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static create = (form) => {
		let params = {

			id_usuario: null,
			id_rol: form.id_rol,
			nombre_completo: form.nombre_completo,
			sexo: form.sexo,
			telefono: form.telefono,
			email: form.email,
			id_cat_estado:  form.id_cat_estado,
			id_cat_municipio: form.id_cat_municipio,
			direccion: form.direccion,
			usuario: form.usuario,
			password: form.password
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Agregar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static update = (form) => {
		let params = {
			id_usuario: form.id_usuario,
			id_cat_sexo: form.id_cat_sexo,
			username: form.username,
			password: form.password,
			nombre: form.nombre,
			apellido_paterno: form.apellido_paterno,
			apellido_materno: form.apellido_materno,
			foto_archivo: form.foto_archivo,
			foto_formato: form.foto_formato,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Editar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static delete = (item) => {
		let params = {
			id_usuario: item.id_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
}

export default UsuarioService;
