/**
 * entry.js
 * Author: Barbara Goss
 * Created: 2017-01-26
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Login from './components/sections/auth/login';
import Films from './components/sections/films';

ReactDOM.render(<App />, document.getElementById("placeholder"));

/*
ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ Films } />
            <Route path="login" component={ Login } />
        </Route>
    </Router>,
    document.getElementById('placeholder')
);*/
