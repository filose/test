import React from 'react';
import Icon from './Icon';
import Score from './Score';

const FixtureChild = React.createClass({

  awayPicker: function(){
    return this.props.getCurrentFixture({awayPicker: true});
  },

  render: function(){

    // For fixtures
    if(this.props.route.path === 'fixtures'){
      var kickoff = new Date(this.props.fixture.kickoff);

      return (
        <div className="fixture__kickoff">
          <small className="fixture__kickoff__day">
            {kickoff.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long'
            })}
          </small>
          <br />
          <small className="fixture__kickoff__time">
            {kickoff.toLocaleTimeString('en-GB', {
              hour: 'numeric',
              minute: 'numeric'
            })}
          </small>
        </div>
      );
    }

    // For results
    if(this.props.route.path === 'results'){
      return (
        <div>
          <div className="fixture__ui">
            <Score score={this.props.fixture.result ? this.props.fixture.result.home : '?'} disabled />
              <small>vs</small>
            <Score score={this.props.fixture.result ? this.props.fixture.result.away : '?'} disabled />
          </div>
        </div>
      );
    }

    // For predictions
    if(this.props.picks[this.props.roundIndex] && this.props.picks[this.props.roundIndex][this.props.fixtureIndex]){
      var thisFixture = this.props.picks[this.props.roundIndex][this.props.fixtureIndex];
      return (
        <div className="fixture__ui">
          <Score score={thisFixture.home} getCurrentFixture={this.props.getCurrentFixture} />
            <small>vs</small>
          <Score score={thisFixture.away} getCurrentFixture={this.awayPicker} />
        </div>
      );
    }

    return (
      <div className="fixture__ui">
        <button className="margin-center" onClick={this.props.getCurrentFixture}>
          <Icon symbol="crystal-ball"/>
        </button>
      </div>
    );
  }
});

export default FixtureChild;
