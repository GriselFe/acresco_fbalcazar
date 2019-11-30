import {CONFIG} from '../Config/Config';

import {withRouter} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios/index';


export const $cLog = (string, color, background) => {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#616365');
	var _background = (background ? background : '#AFB1B3');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
};

export const $cInfo = (string, color, background) => {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#0025a1');
	var _background = (background ? background : '#E6F2FF');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
};

export const $cWarn = (string, color, background) => {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#a18600');
	var _background = (background ? background : '#FCFFC8');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
};

export const $cError = (string, color, background) => {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#aa3700');
	var _background = (background ? background : '#ffe1dd');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
};

export const $cSuccess = (string, color, background) => {
	var _string;
	if (FieldsJs.isObject(string) || FieldsJs.isArray(string)) {
		_string = JSON.stringify(string, null, 2);
	} else {
		_string = string;
	}
	var _color = (color ? color : '#098500');
	var _background = (background ? background : '#e4ffed');
	var dato = [
		"%c%s",
		"color: " + _color + "; background: " + _background + "; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
		_string
	];
	window.console.log(
		dato[0],
		dato[1],
		dato[2]
	);
};

export const date_parse = (e) => {
	return e ? Date.parse(ios_date(e)) : e
};

export const ios_date = (r) => {
	var s, t, e;
	return r ? !0 === str_search(r, "GMT") ? r : (!0 === str_search(r, " ") ? (s = r.split(" ")[0], t = r.split(" ")[1]) : s = r, e = (!0 === str_search(s, "-") ? str_replace("-", "/", s) : s).split("/"), Number(e[0]) < Number(e[2]) ? e[2] + "/" + e[1] + "/" + e[0] + (t ? " " + t : "") : e[0] + "/" + e[1] + "/" + e[2] + (t ? " " + t : "")) : r;
};

export const str_replace = (search, replace, subject, option) => {
	if (option === true) {
		return subject.split(search).join(replace);
	} else {
		for (; -1 !== subject.toString().indexOf(search);) subject = subject.toString().replace(search, replace);
		return subject;
	}
};

export const str_search = (subject, search) => {
	return -1 < subject.toString().indexOf(search);
};

export const FloatSolo = (e) => {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let letras = "0123456789.";
	let especiales = [8, 9, 37, 38, 40, 39, 46, 160];
	let tecla_especial = false;
	for (var i in especiales) {
		if (key === especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) === -1 && !tecla_especial) {
		e.preventDefault();
	}
};

export const EnteroSolo = (e) => {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let letras = "0123456789";
	let especiales = [8, 9, 37, 38, 40, 39, 46, 160];
	let tecla_especial = false;
	for (var i in especiales) {
		if (key === especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) === -1 && !tecla_especial) {
		e.preventDefault();
	}
};

export const AlfanumericoSolo = (e) => {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let letras = "0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
	let especiales = [8, 9, 37, 38, 40, 39, 46, 160];
	let tecla_especial = false;
	for (var i in especiales) {
		if (key === especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) === -1 && !tecla_especial) {
		e.preventDefault();
	}
};

export const MinMax = (e, min, max) => {
	let value = e.target.value;
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key).toLowerCase();
	let num;
	if (!isNaN(Number(value))) {
		num = Number(value);
	}
	if (Number(tecla) >= 0) {
		num = value.toString() + tecla.toString();
		num = Number(num);
	}
	console.log(value, tecla, min, max, num);
	if (!(num >= min && num <= max)) {
		e.preventDefault();
	}
};

export const isEnter = (e) => {
	let key = e.keyCode || e.which;
	return key === 13;
};

export const imprimir = (strung, obj, type) => {
	let dato = [];
	if (type) {
		dato = [
			"%c%s%c%s\n",
			"color: white; background: gray; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
			" " + strung,
			"color: #30568C; background: #FAFAFA; font-size: 12px;font-weight: bold;",
			obj
		];
		window.console.log(
			dato[0],
			dato[1],
			dato[2],
			dato[3],
			JSON.stringify(dato[4], null, 2)
		);
	} else {
		dato = [
			"%c%s%c\n",
			"color: white; background: gray; font-size: 12px;font-weight: bold;letter-spacing: 10px;",
			" " + strung,
			"color: #30568C; background: #FAFAFA; font-size: 12px;font-weight: bold;",
			obj
		];
		window.console.log(
			dato[0],
			dato[1],
			dato[2],
			dato[3],
			dato[4]
		);
	}
};

export const getPrefix = (key) => {
	return CONFIG.prefix + "." + key;
};

export const isJson = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const b64ToUint6 = (nChr) => {
	return nChr > 64 && nChr < 91 ? nChr - 65 : nChr > 96 && nChr < 123 ? nChr - 71 : nChr > 47 && nChr < 58 ? nChr + 4 : nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
};

export const base64DecToArr = (sBase64, nBlocksSize) => {
	var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
		nInLen = sB64Enc.length,
		nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
		taBytes = new Uint8Array(nOutLen);
	
	for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
		nMod4 = nInIdx & 3;
		nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
		
		if (nMod4 === 3 || nInLen - nInIdx === 1) {
			for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
				taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
			}
			
			nUint24 = 0;
		}
	}
	
	return taBytes;
};

export const FirstError = (response) => {
	var Array_Log_Error = [];
	
	if (FieldsJs.Array(response.errors)) {
		Array_Log_Error = FieldsJs.Copy(response.errors);
	}
	var msger = "";
	
	if (FieldsJs.Field(response.mensaje)) {
		msger = response.mensaje;
	} else if (FieldsJs.Field(response.message)) {
		msger = response.message;
	}
	
	if (FieldsJs.Array(Array_Log_Error)) {
		var band = true;
		for (let ix in Array_Log_Error) {
			let Item_Error = Array_Log_Error[ix];
			if (FieldsJs.Array(Item_Error) === true) {
				for (let b = 0; b < Item_Error.length; b++) {
					let itemE = Item_Error[b];
					if (band === true) {
						if (FieldsJs.isArray(itemE)) {
							for (let c = 0; c < itemE.length; c++) {
								let itemZ = itemE[c];
								if (FieldsJs.isString(itemZ)) {
									msger = itemZ;
									band = false;
								} else if (FieldsJs.isObject(itemZ)) {
									for (let i in itemZ) {
										let itemY = itemZ[i];
										msger = itemY;
										band = false;
									}
								} else if (FieldsJs.isArray(itemZ)) {
									msger = itemZ[0];
									band = false;
								}
							}
						} else if (FieldsJs.isObject(itemE)) {
							for (let i in itemE) {
								let itemZ = itemE[i];
								msger = itemZ;
								band = false;
							}
						} else if (FieldsJs.isString(itemE)) {
							msger = itemE;
							band = false;
						}
					}
				}
			} else {
				if (FieldsJs.isString(Item_Error)) {
					msger = Item_Error;
				}
			}
		}
	} else {
		if (FieldsJs.isString(Array_Log_Error)) {
			msger = Array_Log_Error;
		}
	}
	
	return FieldsJs.FirstMayus(msger || 'Error al procesar los datos.');
};

export const showSpinner = (id) => {
	document.getElementById(id || "spinner").style.display = 'flex';
};

export const hideSpinner = (id, time) => {
	if (!time) {
		time = 1000;
	}
	setTimeout(() => {
		document.getElementById(id || "spinner").style.display = 'none';
	}, time);
	
};

/*
* Libreria de clases utiles
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export class FileBase64 {
	static Base64 = (element, formatos, MegaByte) => {
		return new Promise((resolve, reject) => {
			let files = {};
			let archivos = element.files;
			let flag_error = false;
			let mensaje = "";
			if (archivos.length <= 0) {
				flag_error = true;
				mensaje = "No has seleccionado un archivos";
			} else {
				let type = null;
				if (!archivos[0].type) {
					if (archivos[0].name) {
						if (str_search(archivos[0].name, '.')) {
							let arc = archivos[0].name.split('.');
							type = "application/" + arc[arc.length - 1]; // Funcionalidad para los archivos .rar
						}
					}
				}
				files = {
					name: archivos[0].name,
					size: archivos[0].size,
					type: archivos[0].type || type,
					lastModified: archivos[0].lastModified,
					lastModifiedDate: archivos[0].lastModifiedDate,
					webkitRelativePath: archivos[0].webkitRelativePath
				};
				if (files.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
					files.type = "application/xlsx";
				}
				if (files.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
					files.type = "application/docx";
				}
				if (files.type === "text/plain") {
					files.type = "text/txt";
				}
				if (FieldsJs.inArray(formatos, files.type) === false) {
					flag_error = true;
					mensaje = "El formato del archivo seleccionado no es válido";
				}
				if (!(MegaByte > 0)) {
					let Cfg = ReactLocalStorageService.get('Cfg') || {};
					if (Number(Cfg.archivo_maximo_megas) > 0) {
						MegaByte = Number(Cfg.archivo_maximo_megas); // Megas por default del webservice
					} else {
						MegaByte = 5.5; // Por default 5.5 megas
					}
				}
				let Byte = MegaByte * 1e+6;
				if (files.size > Byte) {
					flag_error = true;
					mensaje = "El tamaño máximo del archivo no debe ser mayor a " + Math.floor(MegaByte) + "MB, el tamaño del archivo que intenta seleccionar es de " + (Math.floor(files.size / 1e+6)) + "MB a " + (Math.ceil(files.size / 1e+6)) + "MB";
				}
			}
			if (flag_error === false) {
				let fileReader = new FileReader();
				fileReader.onabort = (r) => {
				};
				fileReader.onerror = (r) => {
				};
				fileReader.onload = (r) => {
					let response = {
						status: 200,
						mensaje: "Archivo seleccionado con éxito",
						name: files.name,
						size: files.size,
						type: files.type,
						formato: files.type.split("/")[1],
						lastModified: files.lastModified,
						lastModifiedDate: files.lastModifiedDate,
						webkitRelativePath: files.webkitRelativePath,
						base64: r.target.result,
						base64Tipo: r.target.result.split(",")[0],
						tipo: r.target.result.split(",")[0],
						archivo: r.target.result.split(",")[1]
					};
					console.log("FILE|=> onload(response): ", response);
					resolve(response);
				};
				fileReader.onloadstart = (r) => {
				};
				fileReader.onloadend = (r) => {
				};
				fileReader.onprogress = (r) => {
				};
				fileReader.readAsDataURL(archivos[0]);
			} else {
				if (document.getElementById(element.id)) {
					document.getElementById(element.id).value = "";
				}
				let error = {
					status: 400,
					mensaje: mensaje,
					name: files.name,
					size: files.size,
					type: files.type,
					formato: files.type.split("/")[1],
					lastModified: files.lastModified,
					lastModifiedDate: files.lastModifiedDate,
					webkitRelativePath: files.webkitRelativePath,
					base64: null,
					base64Tipo: null,
					tipo: null,
					archivo: null
				};
				console.log("FILE|=> onload(error): ", error);
				reject(error);
			}
		});
	};
}

export class ReactLocalStorageService {
	static set = (key, value) => {
		try {
			var index = getPrefix(key);
			if (key) {
				var a = value && typeof value === 'object' && value.constructor === Array;
				var b = value && typeof value === 'object' && value.constructor === Object;
				if (a || b) {
					reactLocalStorage.setObject(index, value);
				} else {
					reactLocalStorage.set(index, value);
				}
				return true;
			} else {
				console.error('Required params key');
				return false;
			}
		} catch (e) {
			console.error(e);
			return false;
		}
	};
	static get = (key) => {
		try {
			var index = getPrefix(key);
			if (key) {
				var value;
				var data = reactLocalStorage.get(index);
				if (isJson(data)) {
					value = JSON.parse(data);
				} else {
					value = data;
				}
				return value;
			} else {
				console.error('Required params key');
				return false;
			}
		} catch (e) {
			console.error(e);
			return false;
		}
	};
	static remove = (key) => {
		var index = getPrefix(key);
		return reactLocalStorage.remove(index);
	};
	static clean = () => {
		return reactLocalStorage.clear();
	};
};

export class FileAction {
	static Open = (file, tipo) => {
		var format = file.split(".");
		var fileURL = "";
		var extension = format[format.length - 1];
		if ((extension === "pdf" || extension === "docx" || extension === "xlsx" || extension === "csv" || extension === "text" || extension === "txt" || extension === "rar" || extension === "zip") || tipo === 'url') {
			if (str_search(file, 'https://') || str_search(file, 'http://') || str_search(file, 'www.')) {
				fileURL = file;
			} else {
				fileURL = CONFIG.src + file;
			}
		} else {
			var files = new Blob([base64DecToArr(file)], {
				type: 'application/pdf'
			});
			fileURL = URL.createObjectURL(files);
		}
		
		if (fileURL === "") {
			return;
		}
		
		setTimeout(function () {
			var aurldoc = document.createElement("a");
			aurldoc.href = fileURL;
			aurldoc.target = "_blank";
			document.body.appendChild(aurldoc);
			aurldoc.click();
			aurldoc.remove();
		}, 100);
	};
}

export class FieldsJs {
	static timeout = null;
	
	static isBoolean = (variable_string_name) => {
		return (typeof variable_string_name === "boolean") && (variable_string_name === true || variable_string_name === false);
	};
	
	static isObject = (obj) => {
		return obj && typeof obj === 'object' && obj.constructor === Object;
	};
	
	static isArray = (arr) => {
		return arr && typeof arr === 'object' && arr.constructor === Array;
	};
	
	static isString = (variable_string_name) => {
		return (typeof variable_string_name === "string");
	};
	
	static isNumber = (value) => {
		var isn = false;
		var num0 = Number(value);
		if (typeof num0 === "number" && !isNaN(num0)) {
			isn = true;
		}
		return isn;
	};
	
	static isDefined = (variable_string_name) => {
		return (typeof (window[variable_string_name]) != "undefined");
	};
	
	static isFunction = (funtion_string_name) => {
		return (typeof (window[funtion_string_name]) != "function");
	};
	
	static inArray = (ObjOrArray, val) => {
		try {
			if (Array.isArray(ObjOrArray) === false) {
				throw Object({
					status: false,
					mensaje: "Primer parámetro, solo admite arreglos..."
				});
			}
			if (ObjOrArray.length <= 0) {
				throw Object({
					status: false,
					mensaje: "Primer parámetro, el arreglo esta vació..."
				});
			}
			if (this.Field(val) === false) {
				throw Object({
					status: false,
					mensaje: "El segundo parámetro requiere un valor..."
				});
			}
			if (typeof val !== "number" && typeof val !== "string") {
				throw Object({
					status: false,
					mensaje: "El segundo parámetro solo admite numérico o cadena: " + val + " No es un valor válido"
				});
			}
			if (ObjOrArray.indexOf(this.getNumOrStr(val)) >= 0) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			console.log(e.mensaje);
			return e.status;
		}
	};
	
	static TimePromise = (time, resolve, reject) => {
		if (!(Number(time) > 0)) {
			time = 700;
		}
		if (this.timeout) {
			clearTimeout(this.timeout);
			if (typeof reject === "function") {
				reject(false);
			}
		}
		this.timeout = setTimeout(function () {
			if (typeof resolve === "function") {
				resolve(true);
			}
		}, time);
	};
	
	static HandleChange = (e, variable, campo, date, input, resolve) => {
		
		if ((date && input) || input) {
			
			resolve({
				name: input,
				value: date
			});
			
		} else {
			
			const {value, name, checked, type} = e.target;
			
			if (variable && campo) {
				
				console.log(value, name, checked, type);
				
				let key = Number(name.split('__')[1]);
				
				console.log(key);
				
				let arr_temp = this.state[variable];
				
				for (let i = 0; i < arr_temp.length; i++) {
					
					if (key === i) {
						arr_temp[i][campo] = type === 'checkbox' ? checked : value;
					}
				}
				
				resolve({
					name: variable,
					value: arr_temp
				});
				
			} else {
				
				resolve({
					name: name,
					value: type === 'checkbox' ? checked : value
				});
				
			}
			
		}
	};
	
	static ChangeValue = (obj_or_arr_name__key, var_name, var_value, resolve, state) => {
		
		console.log(obj_or_arr_name__key, var_name, var_value, state);
		
		if (obj_or_arr_name__key !== null) {
			if (str_search(obj_or_arr_name__key, '#')) {
				let arr_name = obj_or_arr_name__key.split('#')[0];
				let key = Number(obj_or_arr_name__key.split('#')[1]);
				let arr_value = state[arr_name];
				for (let i = 0; i < arr_value.length; i++) {
					if (key === i) {
						arr_value[i][var_name] = var_value;
					}
				}
				resolve({
					name: arr_name,
					value: arr_value
				});
			} else {
				let obj_name = obj_or_arr_name__key;
				let obj_value = state[obj_name];
				obj_value[var_name] = var_value;
				resolve({
					name: obj_name,
					value: obj_value
				});
			}
			
		} else {
			resolve({
				name: var_name,
				value: var_value
			});
		}
		
	};
	
	static Copy = (ObjOrArray) => {
		if (this.isArray(ObjOrArray)) {
			let oa = JSON.stringify(ObjOrArray);
			return JSON.parse(oa);
			// return [...ObjOrArray];
		} else if (this.isObject(ObjOrArray)) {
			let oa = JSON.stringify(ObjOrArray);
			return JSON.parse(oa);
			// return {...ObjOrArray};
		} else {
			return ObjOrArray;
		}
	};
	
	static Field = (campo) => {
		return campo && (campo !== undefined && campo !== null && campo !== "" && campo !== "undefined" && campo !== "null");
	};
	
	static Array = (ObjOrArray) => {
		return ObjOrArray && ((typeof ObjOrArray === "object") && (Object.keys(ObjOrArray || {}).length > 0));
	};
	
	static FirstMayus = (string, el_resto_minuscula) => {
		if (typeof string === "string") {
			string = string.trim();
			if (string) {
				if (el_resto_minuscula === true) {
					return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
				} else {
					return string.charAt(0).toUpperCase() + string.slice(1);
				}
			} else {
				return string;
			}
		} else {
			return string;
		}
	};
	
	static AppendHtml = (id, html) => {
		var nodo = document.createElement("DIV");
		nodo.innerHTML = html;
		var content = document.getElementById(id);
		if (content) {
			content.appendChild(nodo);
		}
	};
	
	static getNum = (value) => {
		var num0 = Number(value);
		var num1 = 0;
		if (typeof num0 === "number" && !isNaN(num0)) {
			num1 = num0;
		}
		return num1;
	};
	
	static getNumOrStr = (value) => {
		if (this.Field(value)) {
			var numero = Number(value);
			if (typeof numero === "number" && !isNaN(numero)) {
				value = numero;
			}
		}
		return value;
	};
	
	static GetScroll = (id, results) => {
		var elemento = document.getElementById(id);
		
		if (elemento) {
			
			var offsetHeight = elemento.offsetHeight;
			var offsetWidth = elemento.offsetWidth;
			
			var clientHeight = elemento.clientHeight;
			var clientWidth = elemento.clientWidth;
			
			var scrollHeight = elemento.scrollHeight;
			var scrollWidth = elemento.scrollWidth;
			
			var scrollTop = elemento.scrollTop;
			var scrollBottom = elemento.scrollTop + elemento.offsetHeight;
			
			var top = scrollTop;
			var bottom = scrollHeight - scrollBottom;
			
			var s = {
				offsetHeight: offsetHeight,
				offsetWidth: offsetWidth,
				
				clientHeight: clientHeight,
				clientWidth: clientWidth,
				
				scrollHeight: scrollHeight,
				scrollWidth: scrollWidth,
				
				scrollTop: scrollTop,
				scrollBottom: scrollBottom,
				
				top: top,
				bottom: bottom
			};
			
			if (typeof results === "function") {
				results(s);
			} else {
				return s;
			}
		}
	};
	
	static scrollIntoViewStart = (elementid) => {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			elemento.scrollIntoView({
				block: "start",
				behavior: "auto"
			});
		} else {
			console.warn("No se identifica el id...");
		}
	};
	
	static scrollIntoViewEnd = (elementid) => {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			elemento.scrollIntoView({
				block: "end",
				behavior: "auto"
			});
		} else {
			console.warn("No se identifica el id...");
		}
	};
	
	static scrollTop = (elementid, top) => {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			elemento.scrollTop = top;
		} else {
			console.warn("No se identifica el id...");
		}
	};
	
	static scrollStart = (elementid) => {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			elemento.scrollTop = 0;
		} else {
			console.warn("No se identifica el id...");
		}
	};
	
	static scrollEnd = (elementid) => {
		var elemento = document.getElementById(elementid);
		if (elemento) {
			this.GetScroll(elementid, (r) => {
				elemento.scrollTop = r.scrollHeight;
			});
		} else {
			console.warn("No se identifica el id...");
		}
	};
	
	static isLetterRegex = (cadena) => {
		var regex = /^[a-zA-Z]+$/;
		var status = regex.test(cadena);
		return status;
	};
	
	static isNumberRegex = (cadena) => {
		var regex = /^[0-9]+$/;
		var status = regex.test(cadena);
		return status;
	};
	
	static isComaPuntoRegex = (cadena) => {
		var regex = /^[.,]+$/;
		var status = regex.test(cadena);
		return status;
	};
	
	static isLetterNumberRegex = (cadena) => {
		var regex = /^[a-zA-Z0-9]+$/;
		var status = regex.test(cadena);
		return status;
	};
	
	static onClickClass = (className) => {
		return new Promise((resolve) => {
			document.body.addEventListener('click', function (evt) {
				if (evt.target.className === className) {
					resolve(true);
				}
			}, false);
		});
	};
	
	static Currency = (n, c1, d1, t1) => {
		let c = isNaN(c1 = Math.abs(c1)) ? 2 : c1;
		let d = d1 === undefined ? "." : d1;
		let t = t1 === undefined ? "," : t1;
		let s = n < 0 ? "-" : "";
		let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
		let j;
		j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};
}

export class HttpRequest {
	static post = (ws, params, setting, time) => {
		
		if (!(time > 0)) {
			time = 500;
		}
		
		if (!FieldsJs.Array(setting)) {
			setting = {};
		}
		
		setting.authentication = (setting.authentication === true || setting.authentication === undefined || setting.authentication === null);
		setting.spinner = (setting.spinner === true || setting.spinner === undefined || setting.spinner === null);
		
		let data = {};
		
		if (setting.authentication) {
			let Usr = ReactLocalStorageService.get('Usr') || {};
			data = {
				token: Usr.token || '',
				credenciales: {
					id_usuario: Usr.id_usuario || '',
					username: Usr.username || ''
				},
				data: {}
			};
		} else {
			data = {
				data: {}
			};
		}
		
		if (FieldsJs.Array(params)) {
			for (let i in params) {
				data.data[i] = params[i];
			}
		}
		
		if (CONFIG.debug) {
			console.log("W E B S E R V I C E   &   D A T A [POST]:\n\n" + CONFIG.api + ws + "\n" + JSON.stringify(data, null, 2) + '\n');
		}
		
		if (setting.spinner) {
			showSpinner('spinner');
		}
		
		return new Promise((resolve, reject) => {
			axios.post(CONFIG.api + ws, data, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				timeout: undefined,
			}).then(response => {
				
				if (setting.spinner) {
					hideSpinner('spinner', time);
				}
				
				let respuesta = FieldsJs.Copy(response.data);
				
				if (CONFIG.debug) {
					imprimir("R E S P O N S E [POST::" + ws + "]:\n", response.data, false);
				}
				
				this.GetErrorMessageServerRequest(respuesta, function (result) {
					resolve(result);
				}, function (error) {
					reject(error);
				});
				
			}).catch(function (error) {
				
				if (setting.spinner) {
					hideSpinner('spinner', time);
				}
				
				let errors = {};
				
				if (!error) {
					errors = {
						success: false,
						codigo_api: 400,
						mensaje: "Error al procesar los datos",
						error: error
					}
				} else {
					errors = {
						success: false,
						codigo_api: 400,
						mensaje: "Error al procesar los datos",
						error: error
					}
				}
				
				if (CONFIG.debug) {
					window.console.error(errors);
				}
				
				reject(errors);
				
			});
		});
	};
	static get = (ws, params, setting, time) => {
		
		if (!(time > 0)) {
			time = 500;
		}
		
		if (!FieldsJs.Array(setting)) {
			setting = {};
		}
		
		setting.spinner = !(setting.spinner === false || setting.spinner === undefined || setting.spinner === null);
		
		let temp = [];
		
		if (FieldsJs.Array(params)) {
			for (let i in params) {
				temp.push(i + '=' + params[i]);
			}
		}
		
		let data = temp.join('&');
		
		let urls = '';
		
		if (FieldsJs.Field(data)) {
			urls = CONFIG.api + ws + '?' + data;
		} else {
			urls = CONFIG.api + ws;
		}
		
		if (CONFIG.debug) {
			$cSuccess(urls);
		}
		
		if (setting.spinner) {
			showSpinner('spinner');
		}
		
		return new Promise((resolve, reject) => {
			axios.get(urls).then(response => {
				
				if (setting.spinner) {
					hideSpinner('spinner', time);
				}
				
				let respuesta = response.data;
				
				if (CONFIG.debug) {
					window.console.log("R E S P O N S E [GET::" + urls + "]:\n", FieldsJs.Copy(respuesta));
				}
				
				this.GetErrorMessageServerRequest(respuesta, function (result) {
					resolve(result);
				}, function (error) {
					reject(error);
				});
				
			}).catch(function (error) {
				
				if (setting.spinner) {
					hideSpinner('spinner', time);
				}
				
				let errors = {};
				
				if (!error) {
					errors = {
						success: false,
						codigo_api: 400,
						mensaje: "Error al procesar los datos",
						error: error
					}
				} else {
					errors = {
						success: false,
						codigo_api: 400,
						mensaje: "Error al procesar los datos",
						error: error
					}
				}
				
				if (CONFIG.debug) {
					window.console.error(errors);
				}
				
				reject(errors);
				
			});
		});
	};
	
	static GetErrorMessageServerRequest = (response, $PROMISSESUCCESS, $PROMISSEERROR) => {
		var msgerrorserver = "";
		
		if (FieldsJs.Field(response.error) === true) {
			if (!FieldsJs.Array(response.error)) {
				var errorserver = response.error.split("::");
				msgerrorserver += (errorserver[1] ? errorserver[1] : response.error) + " ";
			}
		}
		
		if (FieldsJs.Field(response.file) === true) {
			var fileserver = response.file.split("/");
			msgerrorserver += fileserver[fileserver.length - 1] + " ";
		}
		
		if (FieldsJs.Field(response.line) === true) {
			msgerrorserver += response.line;
		}
		
		if (msgerrorserver) {
			
			let msg = "ADVERTENCIA: " + msgerrorserver;
			
			$PROMISSEERROR({
				success: false,
				codigo_api: 400,
				mensaje: FieldsJs.FirstMayus(msg),
				response: response
			});
			
		} else {
			
			if (response.success === true) {
				
				let msg = FirstError(response);
				
				response.mensaje = FieldsJs.FirstMayus(msg);
				
				$PROMISSESUCCESS(response);
				
			} else {
				
				let msg = FirstError(response);
				
				$PROMISSEERROR({
					success: false,
					codigo_api: 400,
					mensaje: FieldsJs.FirstMayus(msg),
					response: response
				});
				
			}
		}
	};
}

class $State {
	go = (props, url, params) => {
		let pA = [];
		for (let x in params) {
			pA.push(params[x]);
		}
		let pS = pA.join('/');
		let g = '';
		if (url) {
			let u = '';
			if (pS) {
				u = '/' + url + '/' + pS
			} else {
				u = '/' + url
			}
			props.history.push(u);
		}
		return g;
	};
}

export default withRouter(new $State());
