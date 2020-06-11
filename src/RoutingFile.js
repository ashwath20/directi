import { BrowserRouter, Route, Switch, HashRouter, Link } from "react-router-dom";
import React from 'react';
import { createBrowserHistory } from 'history';

import App from './App';
import Movie from './screens/Movies';
import Profile from './screens/Profile'
import Creator from './screens/Creator';
export default function RoutingFile(props) {
    return (
        <BrowserRouter  > 
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/item/:media/:id" component={Movie} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/creator/:id" component={Creator} />
                <Route  path="*" component={App}  />
            </Switch>
        </BrowserRouter  >
    );
}