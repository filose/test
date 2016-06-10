import React from 'react';
import Icon from './Icon';
import h from '../modules/helpers';

const Fixture = React.createClass({
  getInitialState: function(){
    return {
      randomNum: Math.random()
    }
  },

  render: function(){
    if(this.props.pick && this.props.fixture.result){
      var points = h.getPickResult(this.props.pick, this.props.fixture.result);
      var congrats = h.congratulate(points, this.state.randomNum);
      if(points){
        var pointsBanner =
          <div className={'fixture__points-banner fixture__points-banner--' + points }>
            <strong>{points}<small>{points > 1 ? 'pts' : 'pt'}</small></strong>
          </div>;
      }
    }
    if(this.props.pick){
      var fixtureFooter =
        <footer className="fixture__footer">
          <small>{congrats} Your pick {congrats ? 'was' : 'is'} {this.props.pick.home}&mdash;{this.props.pick.away}</small>
        </footer>
    }
    return (
      <li className={points >= 0 ? 'fixture fixture--points-' + points : 'fixture'}>
        <div className="fixture__body">
          <div className="fixture__flag fixture__flag--home">
            <Icon symbol="flag" country={this.props.fixture.home}/>
          </div>
          <h2 className="fixture__team fixture__team--home">{this.props.fixture.home || '???'}</h2>
          {this.props.children}
          <h2 className="fixture__team fixture__team--away">{this.props.fixture.away || '???'}</h2>
          <div className="fixture__flag fixture__flag--away">
            <Icon symbol="flag" country={this.props.fixture.away}/>
          </div>
        </div>
        {fixtureFooter}
        {pointsBanner}
      </li>
    );
  }
});

export default Fixture;
