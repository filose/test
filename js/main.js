import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {authService} from './modules/firebaseHelpers';

/*
  Components
*/

import App from './components/App';
import Register from './components/Register';
import Login from './components/Login';
import Fixtures from './components/Fixtures';
import Predictions from './components/Predictions';
import Results from './components/Results';
import NotFound from './components/NotFound';

// resolve current authentication state
function resolveAuth(nextState, replace){
  if(!authService.getAuth()){
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    })
  }
}

/*
  Routes
*/

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="fixtures" component={Fixtures} onEnter={resolveAuth} />
      <Route path="my-picks" component={Predictions} onEnter={resolveAuth} />
      <Route path="results" component={Results} onEnter={resolveAuth} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#app'));
