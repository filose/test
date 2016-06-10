import React from 'react';
import {authService, firebaseRef} from '../modules/firebaseHelpers';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

const App = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function(){
    return {
      user: {},
      navOpen: false,
      config: {}
    }
  },

  componentWillMount: function(){
    authService.onAuth(function(authData){
      console.log('!DEV! Authentication state: ', authData);
      if(authData){
        this.state.user = {
          id: authData.uid
        };
        this.setState({
          user: this.state.user
        });
      }else{
        this.state.user = {};
        this.setState({
          user: this.state.user
        });
      }

    }.bind(this));

    this.bindAsObject(firebaseRef.child('config'), 'config');
  },

  toggleNav: function(){
    // Open nav if closed
    if(this.state.navOpen === false){
      this.state.navOpen = true;
      this.setState({
        navOpen: this.state.navOpen
      });
    // Close nav if open
    }else{
      this.state.navOpen = false;
      this.setState({
        navOpen: this.state.navOpen
      });
    }
  },

  render: function(){
    var navOpen = this.state.navOpen;
    return (
      <div className="canvas">
        <div className={'main-wrapper ' + (navOpen ? 'main-wrapper--nav-open' : '')}>
          {React.cloneElement(this.props.children, {
            user: this.state.user,
            toggleNav: this.toggleNav,
            activeRound: this.state.config.activeRound
          })}
        </div>
      </div>
    );
  }
});

export default App;
