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

import Typography from "@material-ui/core/Typography";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ModalVerMensualidades extends Component {
	
	state = {};
	constructor() {
		super();
		this.state = {
			open: false,
			meses:[],
			usuario: '',
			importe_total:''
		};
	}
	
	open = () => {
		let item = this.props.item;

		this.setState({
			open: true,
			meses: [],
			usuario: item,
			importe_total:''
		});

		CargarMensualidadService.vermensualidades(item).then(response => {
			this.setState({
				meses: response.data,
				importe_total: response.importe_total
			})
		}).catch(error => {
			alert(error.mensaje);
		})
	};
	
	close = () => {
		this.setState({
			open: false,
			meses:[],
			usuario: ''
		});
	};

	save = () => {
	    if (this.state.id_usuario > 0) {
			this.createCargo();
		} else {
			this.createCargos();
		}
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
						Ver cargos
					</DialogTitle>
					
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<Typography variant="body2" gutterBottom>
									Cargo total:
								</Typography>
								<Typography variant="body2" fontWeight="fontWeightBold" gutterBottom>
									${this.state.importe_total}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<Typography variant="body2" gutterBottom>
									Meses
								</Typography>
							</Grid>

							{this.state.meses.map((items, key) => (
								<Grid  key={items.id_cat_mes} item xs={6} sm={6} md={6} lg={6} xl={6}>
									<List component="nav" aria-label="secondary mailbox folder">
										<ListItem
											button
										>
											<ListItemText primary={items.mes}/>
												<div style={{color: '#3f51b5'}} >
													{items.importe}
												</div>
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


ModalVerMensualidades.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.oneOf([null]).isRequired,
	]),
	tipo: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired,
	RefrechList: PropTypes.func.isRequired,
	componente: PropTypes.element.isRequired
};

export default ModalVerMensualidades;
