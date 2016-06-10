import React from 'react';
import Icon from './Icon';

const Header = React.createClass({
  render: function(){
    var pages = ['fixtures', 'my-picks', 'results', 'standings', 'my-account'];
    var menuItems = pages.map((menuItem, index) =>
      <li key={'menu-item-' + index} className={menuItem === this.props.route.path ? 'menu__item menu__item--active' : 'menu__item'}>
        <a href={menuItem} className="menu__link upcap">{menuItem.replace('-', ' ')}</a>
      </li>
    );
    var headerClass = this.props.roundNav ? 'header header--round-nav' : 'header';
    return (
      <header className={headerClass}>
        <h1 className="header__title upcap">{this.props.title.replace('-', ' ')}</h1>
        <button className="header__btn nav-toggle" onClick={this.props.toggleNav}>
          <Icon symbol="hamburger" />
        </button>
        <nav className="off-canvas">
          <ul className="menu">
            {menuItems}
          </ul>
        </nav>
      </header>
    );
  }
});

export default Header;
