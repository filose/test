import React from 'react';
import h from '../modules/helpers';
import Icon from './Icon';

const RoundNav = React.createClass({
  render: function(){

    if(this.props.fixed){
      if(this.props.rounds[this.props.currentRound]){
        var currentRoundName = this.props.rounds[this.props.currentRound].roundName;
        var currentRoundFixtures = this.props.rounds[this.props.currentRound].fixtures;
        return (
          <div className="round-nav round-nav--single-child">
            <div className="round-nav__info">
              <span>{currentRoundName}</span>
              <br />
              <small className="round-nav__info__dates">{h.getRoundDates(currentRoundFixtures)}</small>
            </div>
          </div>
        );
      }
    }

    if(this.props.rounds[this.props.currentRound]){
      var currentRoundName = this.props.rounds[this.props.currentRound].roundName;
      var currentRoundFixtures = this.props.rounds[this.props.currentRound].fixtures;
      return (
        <div className="round-nav">
        <button
          className="round-nav__prev"
          onClick={this.props.prevRound}
          disabled={this.props.currentRound === 0}
        >
          <Icon symbol="arrow-left"/>
          <small>Prev</small>
        </button>
          <div className="round-nav__info">
            <span>{currentRoundName}</span>
            <br />
            <small className="round-nav__info__dates">{h.getRoundDates(currentRoundFixtures)}</small>
          </div>
          <button
            className="round-nav__next"
            onClick={this.props.nextRound}
            disabled={this.props.currentRound === this.props.rounds.length - 1}
          >
            <Icon symbol="arrow-right"/>
            <small>Next</small>
          </button>
        </div>
      );
    }

    return (
      <div className="round-nav round-nav--single-child">
        <div className="round-nav__info">
          <span>Loading&hellip;</span>
        </div>
      </div>
    );
  }
});

export default RoundNav;
