/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-03
 */
import React from 'react';

import Search from './search';

class Header extends React.Component {
    constructor() {
        super();

        this.renderUserMenu = this.renderUserMenu.bind(this);
        this.logout = this.logout.bind(this);
    }

    render() {
        return (
            <header className="m-auto">
                <nav className="navbar navbar-toggleable-sm">
                    <button className="navbar-toggler navbar-toggler-right"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarLinks"
                            aria-controls="navbarLinks"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon">
                            <i className="fa fa-bars"></i>
                        </span>
                    </button>
                    <a className="navbar-brand mr-auto" href="/">
                        <img src="/img/reel-icon.png" className="img-fluid" alt="" />
                        <span className="logo-name">flimsy</span>
                    </a>
                    { this.renderUserMenu() }
                    <Search handleSearch={ this.props.handleSearch } />
                </nav>
            </header>
        );
    }

    renderUserMenu() {
        if (this.props.user !== null) {
            return (
                <div className="collapse navbar-collapse" id="navbarLinks">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a href="#"
                               className="nav-link dropdown-toggle"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false"
                               id="navbarDropdownLists"
                            >
                                My Lists
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownLists">
                                <a href="#" className="dropdown-item">Friends</a>
                                <a href="#" className="dropdown-item">Venues</a>
                                <a href="#" className="dropdown-item">Media</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#"
                               className="nav-link dropdown-toggle"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false"
                               id="navbarDropdownLists">
                                { this.props.user.name }
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownLists">
                                <a href="#" className="dropdown-item">Account</a>
                                <a href="/" className="dropdown-item" onClick={ this.logout }>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    }

    logout(e) {
        e.preventDefault();
        fetch('/api/logout', {
            credentials: 'same-origin'
        })
            .then(() => this.props.onLogout )
            .catch(error => console.log(error));
    }
}

export default Header;