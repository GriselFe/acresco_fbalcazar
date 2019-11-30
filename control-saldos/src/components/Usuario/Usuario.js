import React, {Component, Fragment} from 'react';

import UsuarioService from "../../services/Usuario/UsuarioService";
import Header from "../../includes/Header";

import {AddOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@material-ui/icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import BotonFlotante from "../../includes/BotonFlotante";
import ModalUsuario from "./includes/ModaUsuario";
import {CONFIG} from "../../settings/Config/Config";

class Usuarios extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			params: props.match.params,
			
			lista: [],
		};
		this.all();
	}
	
	RefrechList = () => {
		this.all();
	};
	
	all = () => {
		UsuarioService.all().then(response => {
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
	
	delete = (item) => {
		UsuarioService.delete(item).then(response => {
			alert(response.mensaje);
			this.RefrechList();
		}).catch(error => {
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
						marginTop: '50px',
						// /*marginLeft: '10px',
						// marginRight: '10px'*/
					}}>

					<div style={{
						paddingLeft: '20px',
						paddingRight: '20px'
					}}>
						<Typography variant="h4" gutterBottom style={{color: '#3f51b5'}}>
							Reporte de usuarios
						</Typography>
						<Table style={{ minWidth: 650}} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Nombre o razón social</TableCell>
									<TableCell align="center">Sexo</TableCell>
									<TableCell align="center">Teléfono</TableCell>
									<TableCell align="center">Email</TableCell>
									<TableCell align="center">Ubicación</TableCell>
									<TableCell align="center">Usuario</TableCell>
									<TableCell align="center">Tipo</TableCell>
									<TableCell align="center">Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.lista.map((item, key) => (
									<TableRow key={item.key}>
										<TableCell component="th" scope="item">
											{item.nombre_completo}
										</TableCell>
										<TableCell align="center">{item.sexo}</TableCell>
										<TableCell align="center">{item.telefono}</TableCell>
										<TableCell align="center">{item.email}</TableCell>
										<TableCell align="center" style={{wordWrap: 'break-word', width: '150px'}}>{item.direccion} {item.estado}, {item.municipio}</TableCell>
										<TableCell align="center">{item.username}</TableCell>
										<TableCell align="center">{item.rol}</TableCell>
										<TableCell align="center">
											{/*<DeleteOutlined onClick={() => this.delete(item)}/>*/}

											{/*<ModalUsuario
												tipo={'edit'}
												item={item || {}}
												RefrechList={this.RefrechList}
												componente={<EditOutlined/>}
											/>*/}

											{/*<ModalUsuario
												tipo={'view'}
												item={item || {}}
												RefrechList={this.RefrechList}
												componente={<SearchOutlined/>}
											/>*/}

										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</Paper>
				<ModalUsuario
					tipo={'add'}
					item={{}}
					RefrechList={this.RefrechList}
					componente={<BotonFlotante icono={<AddOutlined/>}/>}
				/>

				
				<ModalUsuario
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
