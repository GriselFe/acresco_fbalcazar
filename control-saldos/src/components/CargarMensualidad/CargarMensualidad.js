import React, {Component, Fragment} from 'react';

import CargarMensualidadService from "../../services/CargarMensualidad/CargarMensualidadService";
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
import ModalCargarMensualidad from "./includes/ModalCargarMensualidad";
import ModalVerMensualidades from "./includes/ModalVerMensualidades";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";



class Usuarios extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			params: props.match.params,
			search: '',
			lista: [],
			cat_meses : []
		};
		this.all();
	}
	
	RefrechList = () => {
		this.all();
	};
	
	all = () => {
		CargarMensualidadService.all().then(response => {
			this.setState({
				lista: response.data
			});
		}).catch(error => {
			this.setState({
				lista: []
			});
			alert(error.mensaje);
		});
	};
	cargoMasivo = () => {

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
							Cargos a usuarios
						</Typography>
						<Fragment  style={{marginTop:'20px'}}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6} md={8} lg={8} xl={8} justify="center" justify="space-between">
									<TextField
										label="Buscar por nombre, rfc"
										type="text"
										margin="normal"
										fullWidth
										value={this.state.search}
										onChange={(e) => {
											this.setState({
												search: e.target.value
											});
										}}
									/>
								</Grid>
								<Grid  item xs={12} sm={3} md={2} lg={2} xl={2}>
									<ModalCargarMensualidad
										tipo={'add'}
										item={{}}
										RefrechList={this.RefrechList}
										componente={
											<Button variant="contained" color="primary">
												Cargar mensualidad
											</Button>
										}
									/>

								</Grid>
								<Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
									<Button variant="contained" color="default">
										Filtros
									</Button>
								</Grid>
							</Grid>
						</Fragment>

						<Table style={{ minWidth: 500}} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Nombre o razón social</TableCell>
									<TableCell align="center">Teléfono</TableCell>
									<TableCell align="center">Email</TableCell>
									<TableCell align="center">Ubicación</TableCell>
									<TableCell align="center">Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.lista.map((item, key) => (
									<TableRow key={item.key}>
										<TableCell component="th" scope="item">
											{item.nombre_completo}
										</TableCell>
										<TableCell align="center">{item.telefono}</TableCell>
										<TableCell align="center">{item.email}</TableCell>
										<TableCell align="center" style={{wordWrap: 'break-word', width: '150px'}}>{item.direccion} {item.estado}, {item.municipio}</TableCell>
										<TableCell align="center">
											{/*<AddShoppingCartIcon onClick={() => this.all(item)}/>
											<DateRangeIcon onClick={() => this.all(item)}/>*/}
											<ModalCargarMensualidad
												tipo={'add'}
												item={item || {}}
												RefrechList={this.RefrechList}
												componente={
													<Button size="small" color="primary">
														Cargar mensualidad
													</Button>
												}
											/>
											<ModalVerMensualidades
												tipo={'add'}
												item={item || {}}
												RefrechList={this.RefrechList}
												componente={
													<Button size="small" color="primary">
														Ver cargos
													</Button>
												}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

				</Paper>
				<ModalCargarMensualidad
					tipo={'add'}
					item={{}}
					RefrechList={this.RefrechList}
					componente={<BotonFlotante icono={<AddOutlined/>}/>}
				/>

				
				<ModalCargarMensualidad
					tipo={'add'}
					item={{}}
					RefrechList={this.RefrechList}
					componente={<BotonFlotante icono={<AddOutlined/>}/>}
				/>
			
			</Fragment>
		);
	}
}

export default Usuarios;
