import React from 'react';

import Header from './Header';

const Page = React.createClass({

  render: function(){
    return (
      <section className="page">
        <Header
          title={this.props.route.path}
          toggleNav={this.props.toggleNav}
          roundNav={this.props.roundNav}
          route={this.props.route}
        />
        {this.props.children}
      </section>
    );
  }
});

export default Page;
