import {HttpRequest} from '../../settings/Libs/Libs';

class PagosService {

	static all = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuarios_Pagos_Datos', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};


	static pagarcargo = (form) => {
		let params = {
			id_cargo_usuario: form.id_cargo_usuario,
			fecha_pago: form.fecha_pago,
			comprobante: form.comprobante
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Usuario_Saldo_Pagar', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	
}

export default PagosService;
