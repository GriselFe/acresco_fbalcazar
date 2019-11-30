import React, {Component, Fragment} from 'react';

import PagosService from "../../services/Pagos/PagosService";
import Header from "../../includes/Header";

import {AddOutlined, EditOutlined, SearchOutlined} from '@material-ui/icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DateRangeIcon from '@material-ui/icons/DateRange';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import BotonFlotante from "../../includes/BotonFlotante";
import ModalPagarMensualidad from "./includes/ModalPagarMensualidad";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";



class Pagos extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			params: props.match.params,
			search: '',
			lista: [],
			cat_meses : [],
			saldo_total: 0
		};
		this.all();
	}
	
	RefrechList = () => {
		this.all();
	};
	
	all = () => {
		PagosService.all().then(response => {
			this.setState({
				lista: response.data,
				saldo_total: response.saldo_total
			});
		}).catch(error => {
			this.setState({
				lista: []
			});
			alert(error.mensaje);
		});
	};

	

	
	render() {
		
		const {params} = this.props.match;
		
		return (
			<Fragment>

				<Header {...this.props}/>

				<Paper
					style={{
						width: '100%',
						overflowX: 'auto',
						marginTop: '50px'
					}}>
					<div style={{
						paddingLeft: '20px',
						paddingRight: '20px'
					}}>
						<Typography variant="h4" gutterBottom style={{color: '#3f51b5'}}>
							Saldo y Pagos
						</Typography>
						<Fragment  style={{marginTop:'20px', marginBottom:'10px'}}>
							<Grid container spacing={2}  direction="row" justify="flex-end">
								<Grid item xs={12} sm={3} md={3} lg={3} xl={3} justify="center"  >
									<Typography variant="h5" gutterBottom >
										Saldo total
									</Typography>
								</Grid>
								<Grid  item xs={12} sm={2} md={2} lg={2} xl={2}>
									<Typography variant="h5" gutterBottom >
										${this.state.saldo_total || 0}
									</Typography>
								</Grid>
							</Grid>
						</Fragment>

						<Table style={{ minWidth: 500}} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Mes</TableCell>
									<TableCell align="center">Año</TableCell>
									<TableCell align="center">Importe</TableCell>
									<TableCell align="center">Fecha de pago</TableCell>
									<TableCell align="center">Comprobante</TableCell>
									<TableCell align="center">Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.lista.map((item, key) => (
									<TableRow key={item.key}>
										<TableCell component="th" scope="item">
											{item.mes}
										</TableCell>
										<TableCell align="center">{item.anio || 'Pendiente de pago'}</TableCell>
										<TableCell align="center" style={{color: 'red'}}>${item.importe || 0}</TableCell>
										<TableCell align="center">{item.fecha_pago || 'Pendiente de pago'}</TableCell>
										<TableCell align="center">{item.comprobante || 'Pendiente'}</TableCell>
										<TableCell align="center">
											{!item.fecha_pago && item.importe != 0 &&
												<ModalPagarMensualidad
												tipo={'add'}
												item={item || {}}
												RefrechList={this.RefrechList}
												componente={
													<Button size="small" color="primary">
														Pagar mensualidad
													</Button>
												}
												/>
											}
											{!item.fecha_pago && item.importe != 0 &&
											<p align="center" style={{color: 'green'}}>Pagado</p>
											}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

				</Paper>

			
			</Fragment>
		);
	}
}

export default Pagos;
