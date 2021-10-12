import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <span className="navbar-toggler-icon"></span>
                        &ensp;
                        <a href="" className="navbar-brand">Employee Tracker App</a>
                        
                    </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
