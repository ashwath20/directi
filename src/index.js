import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import custStrore from './screens/reduxFile'
import {Provider} from 'react-redux'; 
import axios from 'axios';
import {createHistory} from 'history'
import RoutingFile from './RoutingFile';
//import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { BrowserRouter, Route,Router, Link } from "react-router-dom";

axios.defaults.baseURL="https://api.themoviedb.org/3";

axios.interceptors.request.use(req=>{
  console.log(req);
  return req;
},error=>{return Promise.reject(error)})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={custStrore}>
    <RoutingFile />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
