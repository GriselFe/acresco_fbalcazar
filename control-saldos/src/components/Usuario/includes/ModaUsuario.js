import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import UsuarioService from "../../../services/Usuario/UsuarioService";
import BoxSelectFile from "../../../includes/BoxSelectFile";
import CatalogoService from "../../../services/Catalogos/CatalogoService";
import Typography from "@material-ui/core/Typography";

class ModalUsuario extends Component {
	
	state = {};
	constructor() {
		super();
		this.state = {
			open: false,
			
			id_usuario: '',
			id_rol: '',
			nombre_completo: '',
			sexo: '',
			telefono: '',
			email: '',
			id_cat_estado: '',
			
			id_cat_municipio: '',
			direccion: '',
			usuario: '',
			password: '',
			repetir_password: '',

			cat_roles: [],
			cat_estados: [],
			cat_municipios: [],
			cat_sexos : [{sexo:'Mujer'},{sexo:'Hombre'}]
		};
	}
	
	open = () => {
		let item = this.props.item;
		this.setState({
			open: true,
			
			
			id_usuario: item.id_usuario || '',
			id_rol: item.id_rol || '',
			nombre_completo: item.nombre_completo || '',
			sexo: item.sexo || '',
			telefono: item.telefono || '',
			email: item.email || '',
			id_cat_estado:  item.id_cat_estado || '',
			id_cat_municipio: item.id_cat_municipio || '',
			direccion: item.direccion || '',
			usuario: item.usuario || '',
			password: item.password || '',
			repetir_password: item.repetir_password || '',
		});
		if (item.id_cat_sexo > 0) {
			this.show(item);
		}
		CatalogoService.roles().then(response => {
			this.setState({
				cat_roles: response.data
			})
			CatalogoService.estados().then(response => {
				this.setState({
					cat_estados: response.data
				})
			}).catch(error => {
				alert(error.mensaje);
			})
		}).catch(error => {
			alert(error.mensaje);
		})
	};
	
	close = () => {
		this.setState({
			open: false,


			id_usuario: '',
			id_rol: '',
			nombre_completo: '',
			sexo: '',
			telefono: '',
			email: '',
			id_cat_estado: '',

			id_cat_municipio: '',
			direccion: '',
			usuario: '',
			password: '',
			repetir_password: '',

			cat_roles: [],
			cat_estados: [],
			cat_municipios: [],
		});
	};
	
	
	show = (item) => {
		UsuarioService.show(item).then(response => {
			this.setState({
				id_usuario: response.data.id_usuario || '',
				id_cat_sexo: response.data.id_cat_sexo || '',
				username: response.data.username || '',
				password: response.data.password || '',
				nombre: response.data.nombre || '',
				apellido_paterno: response.data.apellido_paterno || '',
				apellido_materno: response.data.apellido_materno || '',
				
				foto_base64: '',
				foto_base64Tipo: '',
				foto_archivo: response.data.foto_archivo || '',
				foto_formato: response.data.foto_formato || '',
			});
		}).catch(error => {
			alert(error.mensaje);
		});
	};
	cat_municipios = (item) => {
		CatalogoService.municipios(item).then(response => {
			this.setState({
				cat_municipios: response.data
			})
		}).catch(error => {
			alert(error.mensaje);
		})
	};
	save = () => {
		if (this.state.id_usuario > 0) {
			this.update();
		} else {
			this.create();
		}
	};
	
	create = () => {
		UsuarioService.create(this.state).then(response => {
			alert(response.mensaje);
			this.props.RefrechList();
			this.close();
		}).catch(error => {
			alert(error.mensaje);
		});
	};
	
	update = () => {
		UsuarioService.update(this.state).then(response => {
			alert(response.mensaje);
			this.props.RefrechList();
			this.close();
		}).catch(error => {
			alert(error.mensaje);
		});
	};
	
	render() {
		return (
			<div>
				
				<span onClick={this.open}>
					{this.props.componente}
				</span>
				
				<Dialog
					open={this.state.open}
					onClose={() => this.close()}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					maxWidth="lg"
				>
					
					<DialogTitle>
						Agregar usuario
					</DialogTitle>
					
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									select
									label="Permiso"
									margin="normal"
									fullWidth
									SelectProps={{
										native: true,
										MenuProps: {},
									}}
									value={this.state.id_rol}
									onChange={(e) => {
										this.setState({
											id_rol: e.target.value
										})
									}}
								>
									<option value={''}>&nbsp;</option>
									{this.state.cat_roles.map((item, index) => (
										<option key={index} value={item.id_rol}>
											{item.rol}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									label="Nombre o razón social"
									type="text"
									margin="normal"
									fullWidth
									value={this.state.nombre_completo}
									onChange={(e) => {
										this.setState({
											nombre_completo: e.target.value
										});
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									select
									label="Sexo"
									margin="normal"
									fullWidth
									SelectProps={{
										native: true,
										MenuProps: {},
									}}
									value={this.state.sexo}
									onChange={(e) => {
										this.setState({
											sexo: e.target.value
										})
									}}
								>
									<option value={''}>&nbsp;</option>
									{this.state.cat_sexos.map((item, index) => (
										<option key={index} value={item.sexo}>
											{item.sexo}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									label="Teléfono"
									type="text"
									margin="normal"
									fullWidth
									value={this.state.telefono}
									onChange={(e) => {
										this.setState({
											telefono: e.target.value
										});
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									label="Email"
									type="text"
									margin="normal"
									fullWidth
									value={this.state.email}
									onChange={(e) => {
										this.setState({
											email: e.target.value
										});
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									select
									label="Estado"
									margin="normal"
									fullWidth
									SelectProps={{
										native: true,
										MenuProps: {},
									}}
									value={this.state.id_cat_estado}
									onChange={(e) => {
										this.setState({
											id_cat_estado: e.target.value
										});
										this.cat_municipios(e.target.value)
									}}
								>
									<option value={''}>&nbsp;</option>
									{this.state.cat_estados.map((item, index) => (
										<option key={index} value={item.id_cat_estado}>
											{item.estado}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									select
									label="Municipio"
									margin="normal"
									fullWidth
									SelectProps={{
										native: true,
										MenuProps: {},
									}}
									value={this.state.id_cat_municipio}
									onChange={(e) => {
										this.setState({
											id_cat_municipio: e.target.value
										});
									}}
								>
									<option value={''}>&nbsp;</option>
									{this.state.cat_municipios.map((item, index) => (
										<option key={index} value={item.id_cat_municipio}>
											{item.municipio}
										</option>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									label="Dirección"
									type="text"
									margin="normal"
									fullWidth
									value={this.state.direccion}
									onChange={(e) => {
										this.setState({
											direccion: e.target.value
										});
									}}
								/>
							</Grid>

							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									label="Usuario"
									type="text"
									margin="normal"
									fullWidth
									value={this.state.usuario}
									onChange={(e) => {
										this.setState({
											usuario: e.target.value
										});
									}}
									disabled={this.props.tipo === 'view'}
								/>
							</Grid>
							<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
								<TextField
									label="Contraseña"
									type="text"
									margin="normal"
									fullWidth
									value={this.state.password}
									onChange={(e) => {
										this.setState({
											password: e.target.value
										});
									}}
									disabled={this.props.tipo === 'view'}
								/>
							</Grid>


						</Grid>
					</DialogContent>
					
					<DialogActions>
						<Button onClick={() => this.close()} color="primary">
							Cerrar
						</Button>
						<Button onClick={() => this.save()} color="primary" autoFocus>
							Crear
						</Button>
					</DialogActions>
				
				</Dialog>
			</div>
		);
	};
}


ModalUsuario.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.oneOf([null]).isRequired,
	]),
	tipo: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired,
	RefrechList: PropTypes.func.isRequired,
	componente: PropTypes.element.isRequired
};

export default ModalUsuario;
