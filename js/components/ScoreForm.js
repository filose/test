import React from 'react';
import Icon from './Icon';
import Score from './Score';

const ScoreForm = React.createClass({

  getInitialState: function(){
    return {
      score: this.props.existingPick.home || 0,
      pick: {},
      homePicked: false
    };
  },

  componentDidMount: function(){
    if(this.props.awayPicker){
      this.submitHomeScore();
    }
  },

  updateScore: function(){
    this.state.score = this.refs.score.value;
    this.setState({
      score: this.state.score
    });
  },

  submitHomeScore: function(e){
    if(e){
      // Prevent form submit
      e.preventDefault();
    }
    // Save pick to state
    this.state.pick.home = this.refs.score.value;
    // Reset form
    this.refs.score.value = this.state.pick.away || this.props.existingPick.away || 0;
    // Reset score in state
    this.state.score = this.refs.score.value;
    // Transition to away score picker
    this.state.homePicked = true;
    this.setState({
      pick: this.state.pick,
      score: this.state.score,
      homePicked: this.state.homePicked
    });
  },

  submitAwayScore: function(e){
    var that = this;
    // Prevent form submit
    e.preventDefault();
    /*
      !!!DISABLE BUTTON TO PREVENT DOUBLE SUBMISSIONS!!!
    */
    // Submit pick to DB, no need to save away score to state
    this.props.submitScore(this.state.pick.home, this.refs.score.value, function(){
      // Reset form
      that.refs.scoreForm.reset();
      // Reset score in state
      that.state.score = 0;
      that.setState({
        score: that.state.score
      });
      // Close modal
      that.props.closeModal();
    });
  },

  backToHomeScore: function(e){
    // Prevent form submit
    e.preventDefault();
    // Save away pick to state
    this.state.pick.away = this.refs.score.value;
    // Reset form to home pick value
    this.refs.score.value = this.state.pick.home;
    // Reset score in state to home pick
    this.state.score = this.state.pick.home;
    // Transition to home score picker
    this.state.homePicked = false;
    this.setState({
      score: this.state.score,
      homePicked: this.state.homePicked,
      pick: this.state.pick
    });
  },

  cancelModal: function(e){
    // Prevent form submit
    e.preventDefault();
    // Reset form
    this.refs.scoreForm.reset();
    // Reset pick in state
    this.state.pick = {}
    // Reset score in state
    this.state.score = 0;
    this.setState({
      pick: this.state.pick,
      score: this.state.score
    });
    // Close modal
    this.props.closeModal();
  },

  render: function(){

    var formCtrls;

    if(this.state.homePicked){
      formCtrls = <section className="score-form__ctrls">
        <button className="score-form__ctrls__btn" onClick={this.backToHomeScore}>Back</button>
        <button className="score-form__ctrls__btn" onClick={this.submitAwayScore}>Submit</button>
      </section>;
    }else{
      formCtrls = <section className="score-form__ctrls">
        <button className="score-form__ctrls__btn" onClick={this.cancelModal}>Cancel</button>
        <button className="score-form__ctrls__btn" onClick={this.submitHomeScore}>Next</button>
      </section>;
    }

    return (
      <form className="score-form" ref="scoreForm">
        <header className="score-form__header">
          <h1>Pick {this.state.homePicked ? 'Away' : 'Home'} score</h1>
        </header>
        <section className="score-form__picker">
          <Score score={this.state.score} disabled />
          <input
            type="range"
            ref="score"
            min="0"
            max="9"
            step="1"
            defaultValue={this.props.existingPick.home || 0}
            className="score-form__picker__input"
            onChange={this.updateScore}
          />
        </section>
        {formCtrls}
      </form>
    );
  }
});

export default ScoreForm;
