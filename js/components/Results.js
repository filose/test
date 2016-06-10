import React from 'react';
import {firebaseRef} from '../modules/firebaseHelpers';
import ReactFireMixin from 'reactfire';
import h from '../modules/helpers';

import Page from './Page';
import Notification from './Notification';
import FixtureList from './FixtureList';
import RoundNav from './RoundNav';

const Results = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function(){
    return {
      user: {},
      rounds: [],
      picks: {},
      roundPoints: 0
    };
  },

  componentWillMount: function(){
    this.bindAsObject(firebaseRef.child('users').child(this.props.user.id), 'user');
    this.bindAsArray(firebaseRef.child('rounds'), 'rounds');
    this.bindAsObject(firebaseRef.child('users').child(this.props.user.id).child('picks'), 'picks');
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
        <RoundNav rounds={this.state.rounds} currentRound={this.state.currentRound} prevRound={this.prevRound} nextRound={this.nextRound} />
        <Notification message={'Round points: '} type="info" />
        <FixtureList round={this.state.rounds[this.state.currentRound]} route={this.props.route} picks={this.state.picks} roundIndex={this.state.currentRound} />
      </Page>
    );
  }
});

export default Results;
