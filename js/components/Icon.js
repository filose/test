import React from 'react';

const Icon = React.createClass({
  render: function(){
    var symbol = this.props.symbol;
    var country = this.props.country ? '-' + this.props.country : '';
    return (
      <svg className={'svg icon icon--' + symbol} dangerouslySetInnerHTML={
        {__html: '<use xlink:href="/img/icon-sprite.svg#' + symbol + country + '"></use>'}
      } />
    );
  }
});

export default Icon;
