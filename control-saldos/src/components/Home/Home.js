import React, {Component, Fragment} from 'react';

import Header from "../../includes/Header";

class Home extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			params: props.match.params,
		};
	}
	
	render() {
		
		return (
			<Fragment>
				
				<Header {...this.props}/>
				

			
			</Fragment>
		);
	}
}

export default Home;
