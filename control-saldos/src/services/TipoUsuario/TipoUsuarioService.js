import {HttpRequest} from '../../settings/Libs/Libs';

class TipoUsuarioService {
	
	static all = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Tipo_Usuario_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static show = (item) => {
		let params = {
			id_tipo_usuario: item.id_tipo_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Tipo_Usuario_Xid', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static create = (form) => {
		let params = {
			id_tipo_usuario: null,
			tipo_usuario: form.tipo_usuario,
			activo: form.activo,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Tipo_Usuario_Agregar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static update = (form) => {
		let params = {
			id_tipo_usuario: form.id_tipo_usuario,
			tipo_usuario: form.tipo_usuario,
			activo: form.activo,
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Tipo_Usuario_Editar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
	static delete = (item) => {
		let params = {
			id_tipo_usuario: item.id_tipo_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Tipo_Usuario_Eliminar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
}

export default TipoUsuarioService;
