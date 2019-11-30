import React, {Component, Fragment} from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {FieldsJs, FileBase64} from "../settings/Libs/Libs";
import ModalImage from "./ModalImage";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";


class BoxSelectFile extends Component {
	
	state = {};
	
	constructor(props) {
		super(props);
		this.state = {
			id: props.id ? props.id : 'id_file' + this.random_id() + this.random_id() + this.random_id(),
			archivo: '',
			formato: '',
			tipo: '',
		};
	}
	
	random_id = () => {
		var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
		var txt = "";
		for (let i = 0; i < 20; i++) txt += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
		return txt;
	};
	
	ClickInputFile = (id) => {
		document.getElementById(id).click();
	};
	
	FileBase64 = (e, id) => {
		let formatos = this.props.FormatAccepted || [];
		FileBase64.Base64(e.target, formatos, this.props.MegaByte || null).then((response) => {
			this.props.onChange(response);
		}).catch((error) => {
			alert(error.mensaje);
		});
	};
	
	render() {
		
		let style = {};
		if (FieldsJs.isObject(this.props.style)) {
			style = this.props.style;
		} else {
			style.height = "100px";
		}
		style.opacity = (!!this.props.disabled ? 0.4 : 1);
		style.border = '1px solid gray';
		style.widht = '100%';
		
		return (
			<Fragment>
				<div style={style}>
					<div>
						<div align={'center'}>
							{this.props.item.archivo ? (
								<Fragment>
									<Tooltip TransitionComponent={Zoom} placement={"top"} title={'Ver documento'}>
										<Avatar style={{
											width: 40,
											height: 40,
											background: this.props.colorCircleIcon || '#3E3E3E',
											marginTop: '7px',
											marginBottom: '7px'
										}}>
											<div align={"center"}>
												<ModalImage
													tipo={'view'} desing={null}
													item={{
														base64: this.props.item.base64 || '',
														base64Tipo: this.props.item.base64Tipo || '',
														archivo: this.props.item.archivo || '',
														formato: this.props.item.formato || '',
													}}
												/>
											</div>
										</Avatar>
									</Tooltip>
									{this.props.button ? (
										<div className={'vertical-inline cursor-pointer'}
										     onClick={() => {
											     if (!!!this.props.disabled) {
												     this.ClickInputFile(this.state.id);
											     }
										     }}>
											<div className={'v-center'}>
												{this.props.button}
											</div>
										</div>
									) : (
										<div style={{
											border: '1px solid black',
											width: '100px',
											borderRadius: '30px',
											cursos: 'pointer'
										}}
										     onClick={() => {
											     if (!!!this.props.disabled) {
												     this.ClickInputFile(this.state.id);
											     }
										     }}>
											<div style={{width: '100%', textAlign: 'center'}}>
												Cambiar
											</div>
										</div>
									)}
								</Fragment>
							) : (
								<Fragment>
									{this.props.button ? (
										<div className={'vertical-inline cursor-pointer'}
										     onClick={() => {
											     if (!!!this.props.disabled) {
												     this.ClickInputFile(this.state.id);
											     }
										     }}>
											<div className={'v-center'}>
												{this.props.button}
											</div>
										</div>
									) : (
										<div style={{
											border: '1px solid black',
											width: '100px',
											borderRadius: '30px',
											cursos: 'pointer'
										}}
										     onClick={() => {
											     if (!!!this.props.disabled) {
												     this.ClickInputFile(this.state.id);
											     }
										     }}>
											<div style={{width: '100%', textAlign: 'center'}}>
												Seleccionar
											</div>
										</div>
									)}
								</Fragment>
							)}
							{this.props.label ? (
								<Typography component={'div'} style={{lineHeight: '12px'}}>
									{this.props.label}
								</Typography>
							) : ''}
						</div>
						<input
							type="file"
							id={this.state.id}
							onChange={(e) => this.FileBase64(e, this.state.id)}
							style={{display: "none"}}
							capture={"camera"}
						/>
					</div>
				</div>
			</Fragment>
		)
	}
}

BoxSelectFile.defaultProps = {
	FormatAccepted: [
		"image/jpeg",
		"image/png",
		"application/pdf",
		"application/xlsx",
		"application/docx",
		"text/txt",
		"text/csv",
		"application/rar",
		"application/zip",
	],
};

BoxSelectFile.propTypes = {
	id: PropTypes.number,
	label: PropTypes.element,
	button: PropTypes.element,
	item: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	showSnackBars: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	style: PropTypes.object,
	MegaByte: PropTypes.number,
	FormatAccepted: PropTypes.arrayOf(
		PropTypes.oneOf([
			"image/jpeg",
			"image/png",
			"application/pdf",
			"application/xlsx",
			"application/docx",
			"text/txt",
			"text/csv",
			"application/rar",
			"application/zip",
		])
	),
};

export default BoxSelectFile;
