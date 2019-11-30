import React, {Component, Fragment} from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import $State, {FieldsJs} from '../../settings/Libs/Libs';
import LoginService from "../../services/Login/LoginService";


class Login extends Component {
	
	state = {};
	
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
		};
	}
	
	login = () => {
		LoginService.Login(this.state).then(response => {
			$State.go(this.props, 'home', {nombre: response.data.username})
		}).catch(error => {
			console.log(error);
			alert(error.mensaje)
		});
	};
	
	render() {
		return (
			<Fragment>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					style={{height: '100vh', background: '#fcb60142'}}
				>
					<Grid item xs={8} sm={6} md={3} lg={3} xl={3}>
						<Card>
							<CardContent>
								
								<Grid container>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<Typography style={{color: '#3f51b5'}}  gutterBottom>
											Charlie Brown y sus amigos A.C
										</Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextField
											label="Usuario"
											type="text"
											margin="normal"
											variant="outlined"
											fullWidth
											onChange={(e) => {
												this.setState({
													username: e.target.value
												});
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
										<TextField
											label="Contraseña"
											type="password"
											autoComplete="current-password"
											margin="normal"
											variant="outlined"
											fullWidth
											onChange={(e) => {
												this.setState({
													password: e.target.value
												});
											}}
										/>
									</Grid>
								</Grid>
							
							</CardContent>
							<CardActions>
								<Button size="small"   variant="contained" color="primary" align="right" onClick={() => this.login()}>Iniciar sesión</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			
			</Fragment>
		);
	}
}

export default Login;
