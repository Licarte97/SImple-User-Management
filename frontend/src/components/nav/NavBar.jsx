import React, { Component } from 'react'
import { GlobalContext } from '../../context/providers/GlobalContextProvider';
import { ROUTES } from '../../js/Const';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <GlobalContext.Consumer>
                {context => {
                    console.info({ context });
                    const { routeSwitcher } = context;
                    return <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">{"<LOGO>"}</a>
                                <button className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavAltMarkup"
                                    aria-controls="navbarNavAltMarkup"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                        <span
                                            className="nav-link"
                                            onClick={() => {
                                                routeSwitcher(ROUTES.HOME)
                                            }}>Home
                                        </span>
                                        <span
                                            className="nav-link "
                                            onClick={() => {
                                                routeSwitcher(ROUTES.LOGIN)
                                            }}>Login
                                        </span>
                                        {/* <a className="nav-link" href="#">Pricing</a> */}
                                        {/* <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                }}

            </GlobalContext.Consumer>
        )
    }
}
