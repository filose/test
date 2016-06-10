import React from 'react';

import Fixture from './Fixture';
import FixtureChild from './FixtureChild';

const FixtureList = React.createClass({
  getCurrentFixture: function(index, fixture, modalState){
    if(modalState.awayPicker){
      return this.props.openModal(index, fixture, modalState);
    }
    return this.props.openModal(index, fixture);
  },

  render: function(){
    // Fire render fn only when round prop has loaded
    if(this.props.round){

      var fixtures = this.props.round.fixtures.map((fixture, index) =>
        <Fixture key={'fixture-' + index} fixture={fixture}>
          <FixtureChild route={this.props.route} fixture={fixture} fixtureIndex={index} picks={this.props.picks} roundIndex={this.props.roundIndex} getCurrentFixture={this.getCurrentFixture.bind(this, index, fixture)}/>
        </Fixture>
      );

      if(this.props.route.path === 'results'){
        fixtures = this.props.round.fixtures.map((fixture, index) =>
          <Fixture key={'fixture-' + index} fixture={fixture} pick={this.props.picks[this.props.roundIndex] ? this.props.picks[this.props.roundIndex][index] : undefined}>
            <FixtureChild route={this.props.route} fixture={fixture} />
          </Fixture>
        );
      }

      return (
        <ul className="fixture-list">
          {fixtures}
        </ul>
      );
    }

    return <div className="spinner"></div>
  }
});

export default FixtureList;
