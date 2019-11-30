import React, {Component, Fragment} from 'react';

import TipoUsuarioService from "../../services/TipoUsuario/TipoUsuarioService";
import Header from "../../includes/Header";

import {AddOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@material-ui/icons';

import BotonFlotante from "../../includes/BotonFlotante";
import ModalTipoUsuario from "./includes/ModaTipoUsuario";

class TipoUsuario extends Component {
	
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
		TipoUsuarioService.all().then(response => {
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
		TipoUsuarioService.delete(item).then(response => {
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
				
				<table style={{width: '100%'}} border={1}>
					<thead>
					<tr>
						<th>id tipo usuario</th>
						<th>Tipo usuario</th>
						<th>activo</th>
						<th>acciones</th>
					</tr>
					</thead>
					<tbody>
					{this.state.lista.map((item, index) => (
						<tr key={index}>
							<td>{item.id_tipo_usuario}</td>
							<td>{item.tipo_usuario}</td>
							<td>{item.activo}</td>
							<td>
								<DeleteOutlined onClick={() => this.delete(item)}/>
								
								<ModalTipoUsuario
									tipo={'edit'}
									item={item || {}}
									RefrechList={this.RefrechList}
									componente={<EditOutlined/>}
								/>
								
								<ModalTipoUsuario
									tipo={'view'}
									item={item || {}}
									RefrechList={this.RefrechList}
									componente={<SearchOutlined/>}
								/>
							</td>
						</tr>
					))}
					</tbody>
				</table>
				
				<ModalTipoUsuario
					tipo={'add'}
					item={{}}
					RefrechList={this.RefrechList}
					componente={<BotonFlotante icono={<AddOutlined/>}/>}
				/>
			
			</Fragment>
		);
	}
}

export default TipoUsuario;
