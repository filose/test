import React from 'react';

const Navigation = React.createClass({

  getInitialState: function(){
    return {
      navItems: ['fixtures', 'predictions', 'results', 'standings']
    }
  },

  render: function(){
    var navItems = this.state.navItems.map((navItem, index) =>
      <li key={index}>
        <a href={'/' + navItem}>{navItem}</a>
      </li>
    );

    return (
      <nav className="off-canvas">
        <ul>
          {navItems}
        </ul>
      </nav>
    );
  }
});

export default Navigation;
