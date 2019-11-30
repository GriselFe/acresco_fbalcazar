import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import AppRoutes from './route';

import './index.css';

ReactDOM.render(
	<BrowserRouter basename={'/'}>
		<AppRoutes/>
	</BrowserRouter>,
	document.getElementById('root')
);


