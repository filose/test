import React from 'react';
import {firebaseRef} from '../modules/firebaseHelpers';
import ReactFireMixin from 'reactfire';

import Page from './Page';
import Notification from './Notification';
import FixtureList from './FixtureList';
import RoundNav from './RoundNav';

const Fixtures = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function(){
    return {
      user: {},
      rounds: []
    };
  },

  componentWillMount: function(){
    this.bindAsObject(firebaseRef.child('users').child(this.props.user.id), 'user');
    this.bindAsArray(firebaseRef.child('rounds'), 'rounds');
  },

  componentWillReceiveProps: function(nextProps){
    this.state.currentRound = nextProps.activeRound;
    this.setState({
      currentRound: this.state.currentRound
    });
  },

  nextRound: function(){
    if(this.state.currentRound < this.state.rounds.length - 1){
      this.state.currentRound++;
      this.setState({
        currentRound: this.state.currentRound
      });
    }
  },

  prevRound: function(){
    if(this.state.currentRound > 0){
      this.state.currentRound--;
      this.setState({
        currentRound: this.state.currentRound
      });
    }
  },

  render: function(){
    return (
      <Page {...this.props} roundNav>
        <RoundNav rounds={this.state.rounds} currentRound={this.state.currentRound} prevRound={this.prevRound} nextRound={this.nextRound}/>
        <FixtureList round={this.state.rounds[this.state.currentRound]} route={this.props.route}/>
      </Page>
    );
  }
});

export default Fixtures;
