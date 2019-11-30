import React, {Component} from "react";
import PropTypes from 'prop-types';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

class BotonFlotante extends Component {
	render() {
		return (
			<Zoom className={'btn-fixed-bottom-right cursor-pointer'} key={'inherit'} timeout={1500} in={true}
			      style={{transitionDelay: `${100}ms`}} unmountOnExit>
				<Fab color={'primary'} onClick={this.props.onClick}>
					{this.props.icono}
				</Fab>
			</Zoom>
		);
	}
}

BotonFlotante.propTypes = {
	icono: PropTypes.element.isRequired,
	onClick: PropTypes.func
};

export default BotonFlotante;
