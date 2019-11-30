import {HttpRequest} from '../../settings/Libs/Libs';

class CargarMensualidadService {

	static all = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuarios_Cargos_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};


	static createCargos = (form) => {
		let params = {

			importe: form.importe,
			id_cat_mes: form.id_cat_mes
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuarios_Cargos_Agregar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	static createCargo = (form) => {
		let params = {

			importe: form.importe,
			id_cat_mes: form.id_cat_mes,
			id_usuario: form.id_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Cargo_Agregar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	static vermensualidades = (item) => {
		let params = {
			id_usuario: item.id_usuario
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Cargo_xId', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	
}

export default CargarMensualidadService;
