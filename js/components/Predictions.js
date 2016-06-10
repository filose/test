import React from 'react';
import {firebaseRef} from '../modules/firebaseHelpers';
import ReactFireMixin from 'reactfire';

import Page from './Page';
import RoundNav from './RoundNav';
import Notification from './Notification';
import FixtureList from './FixtureList';
import Modal from './Modal';
import ScoreForm from './ScoreForm';

const Predictions = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function(){
    return {
      user: {},
      picks: {},
      existingPick: {},
      rounds: [],
      currentFixture: null,
      modalOpen: false,
      awayPicker: false
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

  openModal: function(index, fixture, modalState){
    this.state.modalOpen = true;
    this.state.currentFixture = {
      index: index,
      fixture: fixture
    };
    this.setState({
      modalOpen: this.state.modalOpen,
      currentFixture: this.state.currentFixture
    });
    if(this.state.picks[this.state.currentRound] && this.state.picks[this.state.currentRound][index]){
      var existingPick = this.state.picks[this.state.currentRound][index];
      this.state.existingPick = {
        home: existingPick.home,
        away: existingPick.away
      };
      this.setState({
        existingPick: this.state.existingPick
      });
    }
    if(modalState){
      this.state.awayPicker = modalState.awayPicker;
      this.setState({
        awayPicker: this.state.awayPicker
      });
    }
  },

  closeModal: function(){
    this.state.modalOpen = false;
    this.state.currentFixture = null;
    this.state.existingPick = {};
    this.state.awayPicker = false;
    this.setState({
      modalOpen: this.state.modalOpen,
      currentFixture: null,
      existingPick: this.state.existingPick,
      awayPicker: this.state.awayPicker
    });
  },

  submitScore: function(homeScore, awayScore, successCallback){
    firebaseRef.child('users').child(this.props.user.id).child('picks').child(this.state.currentRound).child(this.state.currentFixture.index).set({
      'home': Number(homeScore),
      'away': Number(awayScore)
    }, function(error){
      if(error){
        console.log(error);
      }else{
        successCallback();
      }
    });
  },

  render: function(){

    var modal = <Modal><ScoreForm submitScore={this.submitScore} existingPick={this.state.existingPick} awayPicker={this.state.awayPicker} closeModal={this.closeModal} /></Modal>;

    var roundName = '',
        roundStartDate = '',
        roundStartTime = '';
    if(this.state.rounds[this.state.currentRound]){
      roundName = this.state.rounds[this.state.currentRound].roundName;
      roundStartDate =  new Date(this.state.rounds[this.state.currentRound].fixtures[0].kickoff).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long'
      });
      roundStartTime =  new Date(this.state.rounds[this.state.currentRound].fixtures[0].kickoff - (60*60*1000)).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric'
      });
    }

    return (
      <Page user={this.props.user} toggleNav={this.props.toggleNav} route={this.props.route}>
        <RoundNav rounds={this.state.rounds} currentRound={this.state.currentRound} fixed/>
        <Notification message={'What are you waiting for? Make your ' + roundName + ' picks by ' + roundStartDate + ' at ' + roundStartTime + '.'} type="info" closeable />
        <FixtureList round={this.state.rounds[this.state.currentRound]} roundIndex={this.state.currentRound} picks={this.state.picks} route={this.props.route} openModal={this.openModal} />
        {this.state.modalOpen ? modal : null}
      </Page>
    );
  }
});

export default Predictions;
