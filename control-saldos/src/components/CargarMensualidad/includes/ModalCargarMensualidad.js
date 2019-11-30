import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import CargarMensualidadService from "../../../services/CargarMensualidad/CargarMensualidadService";


import CatalogoService from "../../../services/Catalogos/CatalogoService";
import Typography from "@material-ui/core/Typography";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Picker from 'react-month-picker';
import TableRow from "@material-ui/core/TableRow";


class ModalUsuario extends Component {
	
	state = {};
	constructor() {
		super();
		this.state = {
			open: false,
			importe:'750.00',
			cat_meses : [],
			id_cat_mes: ''
		};
	}
	
	open = () => {
		let item = this.props.item;

		this.setState({
			open: true,
			cat_meses: [],
			importe:'750.00',
			id_cat_mes:'',
			id_usuario: this.props.item.id_usuario
		});

		CatalogoService.meses().then(response => {
			this.setState({
				cat_meses: response.data
			})
		}).catch(error => {
			alert(error.mensaje);
		})
	};
	
	close = () => {
		this.setState({
			open: false,
			importe: '',
			cat_meses: [],
			id_cat_mes: ''
		});
	};

	save = () => {
	    if (this.state.id_usuario > 0) {
			this.createCargo();
		} else {
			this.createCargos();
		}
	};
	
	createCargos = () => {
		CargarMensualidadService.createCargos(this.state).then(response => {
			alert(response.mensaje);
			this.props.RefrechList();
			this.close();
		}).catch(error => {
			alert(error.mensaje);
		});
	};

	createCargo = () => {

		CargarMensualidadService.createCargo(this.state).then(response => {
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
						Cargar mensualidad
					</DialogTitle>
					
					<DialogContent>
						<Grid container spacing={2}>

							<Grid item xs={6} sm={6} md={12} lg={12} xl={12}>
								<TextField
									label="Importe"
									type="text"
									margin="normal"
									fullWidth
									value={this.state.importe}
									onChange={(e) => {
										this.setState({
											importe: e.target.value
										});
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<Typography variant="body2" gutterBottom>
									Meses
								</Typography>
							</Grid>
							{this.state.cat_meses.map((items, key) => (
								<Grid  key={items.id_cat_mes} item xs={6} sm={6} md={4} lg={4} xl={4}>
									<List component="nav" aria-label="secondary mailbox folder">
										<ListItem
											button
											selected={this.state.id_cat_mes === items.id_cat_mes}
											onClick={(e) => {
												this.setState({
													id_cat_mes: items.id_cat_mes
												});
												// console.log(item.id_c)
											}}
												>
											<ListItemText primary={items.mes} />
										</ListItem>
									</List>
								</Grid>
							))}

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
