import React from 'react';
import Icon from './Icon';

const Notification = React.createClass({
  getInitialState: function(){
    return {
      closed: false
    };
  },
  closeNotification: function(){
    this.state.closed = true;
    this.setState({
      closed: this.state.closed
    });
  },
  render: function(){
    var notificationClass = 'notification notification--' + this.props.type;
    var hiddenClass = this.state.closed ? ' notification--hidden' : '';
    return (
      <div className={notificationClass + hiddenClass}>
        <article className="notification__message">
          <small>{this.props.message}</small>
        </article>
        <aside className="notification__ctrl" hidden={this.props.closeable ? false : true}>
          <button className="" onClick={this.closeNotification}>
            <Icon symbol="close" />
          </button>
        </aside>
      </div>
    );
  }
});

export default Notification;
