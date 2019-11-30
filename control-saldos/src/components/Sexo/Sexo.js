import React, {Component, Fragment} from 'react';

import CatalogoService from "../../services/Catalogos/CatalogoService";
import Header from "../../includes/Header";

import {AddOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@material-ui/icons';

import BotonFlotante from "../../includes/BotonFlotante";
import ModalSexo from "./includes/ModaSexo";

class Sexo extends Component {
	
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
		CatalogoService.all().then(response => {
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
		CatalogoService.delete(item).then(response => {
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
						<th>id_cat_sexo</th>
						<th>sexo</th>
						<th>activo</th>
						<th>acciones</th>
					</tr>
					</thead>
					<tbody>
					{this.state.lista.map((item, index) => (
						<tr key={index}>
							<td>{item.id_cat_sexo}</td>
							<td>{item.sexo}</td>
							<td>{item.activo}</td>
							<td>
								<DeleteOutlined onClick={() => this.delete(item)}/>
								
								<ModalSexo
									tipo={'edit'}
									item={item || {}}
									RefrechList={this.RefrechList}
									componente={<EditOutlined/>}
								/>
								
								<ModalSexo
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
				
				<ModalSexo
					tipo={'add'}
					item={{}}
					RefrechList={this.RefrechList}
					componente={<BotonFlotante icono={<AddOutlined/>}/>}
				/>
			
			</Fragment>
		);
	}
}

export default Sexo;
