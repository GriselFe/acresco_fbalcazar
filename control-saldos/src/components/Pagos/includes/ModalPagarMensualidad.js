import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import PagosService from "../../../services/Pagos/PagosService";


import CatalogoService from "../../../services/Catalogos/CatalogoService";
import Typography from "@material-ui/core/Typography";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ModalPagarMensualidad extends Component {
	
	state = {};
	constructor() {
		super();

		this.state = {
			open: false,
            fecha_pago: '',
            pago: '',
            importe: '',
            mes: '',
            id_cargo_usuario: ''
		};
	}
	
	open = () => {
		let item = this.props.item;
        let n =  new Date();
        let y = n.getFullYear();
        let m = n.getMonth() + 1;
        let d = n.getDate()
		this.setState({
			open: true,
			fecha_pago: y + '-' + m + '-' + d,
			pago: item,
            importe: item.importe,
            mes: item.mes,
            id_cargo_usuario: item.id_cargo_usuarios
		});

	};
	
	close = () => {
		this.setState({
			open: false,
			fecha_pago:'',
			pago: '',
            importe: '',
            id_cargo_usuario: ''

        });
	};

	save = () => {

		this.pagarSaldo();

	};


	pagarSaldo = () => {

		PagosService.pagarcargo(this.state).then(response => {
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

							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<TextField
									label="Importe"
									type="text"
									margin="normal"
									fullWidth
									value={this.state.importe}
									disabled
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<Typography variant="body2" gutterBottom>
									Mes
								</Typography>
								<List component="nav" aria-label="secondary mailbox folder">
									<ListItem>
										<ListItemText primary={this.state.mes} />
									</ListItem>
								</List>
							</Grid>

							<Grid  item xs={12} sm={6} md={4} lg={4} xl={4}>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue={this.state.fecha_pago}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        this.setState({
                                            fecha_pago: e.target.value
                                        });
                                    }}
                                />
							</Grid>


						</Grid>

					</DialogContent>
					
					<DialogActions>
						<Button onClick={() => this.close()} color="primary">
							Cerrar
						</Button>
						<Button onClick={() => this.save()} color="primary" autoFocus>
							Pagar
						</Button>
					</DialogActions>
				
				</Dialog>
			</div>
		);
	};
}


ModalPagarMensualidad.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.oneOf([null]).isRequired,
	]),
	tipo: PropTypes.string.isRequired,
	item: PropTypes.object.isRequired,
	RefrechList: PropTypes.func.isRequired,
	componente: PropTypes.element.isRequired
};

export default ModalPagarMensualidad;
