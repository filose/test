let helpers= {
  getRoundDates: function(fixtures){
    var dateRange = '';
    if(fixtures.length > 1){
      let firstDate = new Date(fixtures[0].kickoff).toLocaleDateString('en-GB', {
        day: 'numeric'
      });
      let firstMonth = new Date(fixtures[0].kickoff).toLocaleDateString('en-GB', {
        month: 'long'
      });
      let lastDate = new Date(fixtures[fixtures.length - 1].kickoff).toLocaleDateString('en-GB', {
        day: 'numeric'
      });
      let lastMonth = new Date(fixtures[fixtures.length - 1].kickoff).toLocaleDateString('en-GB', {
        month: 'long'
      });
      if(firstMonth === lastMonth){
        dateRange = firstDate + ' - ' + lastDate + ' ' + firstMonth;
      }else{
        dateRange = firstDate + ' ' + firstMonth + ' - ' + lastDate + ' ' + lastMonth;
      }
    }else{
      let firstDate = new Date(fixtures[0].kickoff).toLocaleDateString('en-GB', {
        day: 'numeric'
      });
      let firstMonth = new Date(fixtures[0].kickoff).toLocaleDateString('en-GB', {
        month: 'long'
      });
      dateRange = firstDate + ' ' + firstMonth;
    }
    return dateRange;
  },

  getResult: function(score){
    if(score.home > score.away){
      return 'home win';
    }else if(score.home < score.away){
      return 'away win';
    }else{
      return 'draw';
    }
  },

  getPickResult: function(pick, result){
    if(pick.home === result.home && pick.away === result.away){
      // Exact score
      return 3;
    }else if(this.getResult(pick) === this.getResult(result)){
      // Correct result
      return 1;
    }else{
      // Totally wrong
      return 0;
    }
  },

  congratulate: function(points, randomNum){
    function getRandomWord(words){
      return words[Math.floor(randomNum * words.length)];
    }
    var perfectScoreWords = ['Boom!', 'Yeeeha!', 'Niiice!', 'Perfecto!', 'Woot!', 'Bingo!'];
    var correctResultWords = ['Almost.', 'Nearly.', 'Close.', 'Ball park.'];
    var incorrectWords = ['Nu-uh.', 'Nope.', 'Pshh!', 'Way off!', 'Wrongski.', 'Lol.'];
    if(points === 3){
      return getRandomWord(perfectScoreWords);
    }else if(points === 1){
      return getRandomWord(correctResultWords);
    }else{
      return getRandomWord(incorrectWords);
    }
  }
};

export default helpers;
