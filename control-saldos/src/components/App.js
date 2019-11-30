import React, {Component, Fragment} from 'react';

import PropTypes from 'prop-types';

import './App.css';

class App extends Component {
	
	static propTypes = {
		children: PropTypes.object.isRequired
	};
	
	render() {
		
		const {children} = this.props;
		
		return (
			<Fragment>
				{children}
			</Fragment>
		);
	}
}

export default App;
