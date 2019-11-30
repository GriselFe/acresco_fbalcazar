import {HttpRequest} from '../../settings/Libs/Libs';

class CatalogoService {
	
	static roles = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.get('_Cat_Roles').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	static estados = () => {
		let params = {};
		return new Promise((resolve, reject) => {
			HttpRequest.get('_Cat_Estados').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	static municipios = (item) => {
		let params = {
			id_cat_estado: item
		};
		return new Promise((resolve, reject) => {
			HttpRequest.post('_Cat_Municipios', params).then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	static meses = () => {

		return new Promise((resolve, reject) => {
			HttpRequest.get('_Cat_Meses').then((response) => {
				resolve(response);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	
}

export default CatalogoService;
