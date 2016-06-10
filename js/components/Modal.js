import React from 'react';
import Icon from './Icon';

const Modal = React.createClass({
  render: function(){
    return (
      <div className="overlay">
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Modal;
