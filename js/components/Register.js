import React from 'react';
import {authService, firebaseRef} from '../modules/firebaseHelpers';
import Firebase from 'firebase';

const Register = React.createClass({

  createUser: function(e){
    // Prevent form submission
    e.preventDefault();
    // Create firebase user
    var user = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    authService.register(user.email, user.password, function(authData){
      // Create user profile in db
      firebaseRef.child('users').child(authData.uid).set({
        username: user.username
      });
    });
    // Reset form
    this.refs.regForm.reset();
  },

  render: function(){
    return (
      <div>
        <form ref="regForm" onSubmit={this.createUser}>
          <input type="text" ref="username" placeholder="Username" />
          <input type="email" ref="email" placeholder="Email" />
          <input type="password" ref="password" placeholder="Password" />
          <input type="submit" value="Register" />
        </form>
        <a href="/login">Already have an account?</a>
      </div>
    );
  }
});

export default Register;
