import React from 'react';

const Score = React.createClass({
  render: function(){
    var numberClass = !isNaN(this.props.score) ? 'score__number' : 'score__number score__number--undefined';
    return (
      <button className="score" disabled={this.props.disabled} onClick={this.props.getCurrentFixture}>
        <h2 className={numberClass}>{!isNaN(this.props.score) ? this.props.score : '?'}</h2>
      </button>
    );
  }
});

export default Score;
