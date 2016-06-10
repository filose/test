import React from 'react';
import {authService, firebaseRef} from '../modules/firebaseHelpers';

const Login = React.createClass({

  login: function(e){
    // Prevent form submission
    e.preventDefault();
    // Log user in
    authService.login(this.refs.email.value, this.refs.password.value, loginCallback);
    function loginCallback(authData){
      // After login
    }
    // Reset form
    this.refs.loginForm.reset();
  },

  render: function(){
    return (
      <div>
        <form ref="loginForm" onSubmit={this.login}>
          <input type="email" ref="email" placeholder="Email" />
          <input type="password" ref="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>
        <a href="/register">Don’t have an account yet?</a>
      </div>
    );
  }
});

export default Login;
