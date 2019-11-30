import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import App from './components/App';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Usuarios from './components/Usuario/Usuario';
import CargarMensualidad from './components/CargarMensualidad/CargarMensualidad';
import Pagos from './components/Pagos/Pagos';
import Pagina404 from './components/Pagina404/Pagina404';

class AppRoutes extends Component {
	
	render() {
		return (
			<Fragment>
				<App>
					<Switch>

                        <Route exact path="/" component={Login}/>

                        <Route exact path="/login" component={Login}/>

                        <Route exact path="/home" component={Home}/>

                        <Route exact path="/usuarios" component={Usuarios}/>

                        <Route exact path="/cargar_mensualidad" component={CargarMensualidad}/>

                        <Route exact path="/pagos" component={Pagos}/>

                        <Route exact path="/home/:nombre" component={Home}/>

						<Route component={Pagina404}/>
					
					</Switch>
				</App>
			</Fragment>
		);
	}
}

export default AppRoutes;
