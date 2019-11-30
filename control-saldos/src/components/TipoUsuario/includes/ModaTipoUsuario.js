import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TipoUsuarioService from "../../../services/TipoUsuario/TipoUsuarioService";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


class ModalTipoUsuario extends Component {
	
	state = {};
	
	constructor() {
		super();
		this.state = {
			open: false,
			
			id_tipo_usuario: '',
			tipo_usuario: '',
			activo: false,
		};
	}
	
	open = () => {
		let item = this.props.item;
		this.setState({
			open: true,
			
			id_tipo_usuario: item.id_tipo_usuario || '',
			tipo_usuario: item.tipo_usuario || '',
			activo: item.activo === 1,
		});
		if (item.id_cat_sexo > 0) {
			this.show(item);
		}
	};
	
	close = () => {
		this.setState({
			open: false,
			
			id_tipo_usuario: '',
			tipo_usuario: '',
			activo: false,
		});
	};
	
	
	show = (item) => {
		TipoUsuarioService.show(item).then(response => {
			this.setState({
				id_tipo_usuario: response.data.id_tipo_usuario || '',
				tipo_usuario: response.data.tipo_usuario || '',
				activo: response.data.activo === 1,
			});
		}).catch(error => {
			alert(error.mensaje);
		});
	};
	
	save = () => {
		if (this.state.id_tipo_usuario > 0) {
			this.update();
		} else {
			this.create();
		}
	};
	
	create = () => {
		TipoUsuarioService.create(this.state).then(response => {
			alert(response.mensaje);
			this.props.RefrechList();
			this.close();
		}).catch(error => {
			alert(error.mensaje);
		});
	};
	
	update = () => {
		TipoUsuarioService.update(this.state).then(response => {
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
				>
					
					<DialogTitle>
						Modal tipo usuario
					</DialogTitle>
					
					<DialogContent>
						<Grid container>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<TextField
									label="ID"
									type="text"
									margin="normal"
									variant="outlined"
									fullWidth
									disabled={true}
									value={this.state.id_tipo_usuario}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<TextField
									label="Tipo usuario"
									type="text"
									margin="normal"
									variant="outlined"
									fullWidth
									value={this.state.tipo_usuario}
									onChange={(e) => {
										this.setState({
											tipo_usuario: e.target.value
										});
									}}
									disabled={this.props.tipo === 'view'}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<FormGroup row className={'margin-3-L'}>
									<FormControlLabel
										control={
											<Checkbox
												type="checkbox"
												name='activo'
												checked={this.state.activo}
												onChange={(event, checked) => {
													this.setState({
														activo: checked
													});
												}}
												value="activo"
												color="primary"
												disabled={this.props.tipo === 'view'}
											/>
										}
										label={this.state.activo ? 'Activo' : 'Inactivo'}
									/>
								</FormGroup>
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


ModalTipoUsuario.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.oneOf([null]).isRequired,
	]),
	tipo: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired,
	RefrechList: PropTypes.func.isRequired,
	componente: PropTypes.element.isRequired
};

export default ModalTipoUsuario;
