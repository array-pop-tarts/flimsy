/**
 *
 * Author: Barbara Goss
 * Created: 2017-02-03
 */
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-toggleable-sm">
                    <button className="navbar-toggler navbar-toggler-right"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarLinks"
                            aria-controls="navbarLinks"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon">|||</span>
                    </button>
                    <a className="navbar-brand" href="#">flimsy</a>
                    <div className="collapse navbar-collapse" id="navbarLinks">
                        <ul className="navbar-nav">
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
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="navbarDropdownLists">
                                    Barbara Goss
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownLists">
                                    <a href="#" className="dropdown-item">Account</a>
                                    <a href="#" className="dropdown-item">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;