import React, {Component, Fragment} from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class Pagina404 extends Component {
	
	state = {};
	
	constructor() {
		super();
	}
	
	render() {
		return (
			<Fragment>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					style={{height: '100vh', background: 'lightgray'}}
				>
					<Grid item xs={8} sm={6} md={3} lg={3} xl={3}>
						<Card>
							<CardContent style={{textAlign: 'center'}}>
								
								Pagina 404
							
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			
			</Fragment>
		);
	}
}

export default Pagina404;
