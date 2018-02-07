import React from "react";

import "./TabToolbox.styl";

let me = {};
export default class TabToolbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedIndex: 0 };
        me = this;
    }

    onNavigate(index) {
        me.setState({ selectedIndex: index });
    }

    render() {
        return <div className="qoc-tab-toolbox">
            <nav>
                <a href="#"
                   className={this.state.selectedIndex === 0 ? "active" : ""}
                   onClick={() => this.onNavigate(0)}>Projects</a>
                <a href="#"
                   className={this.state.selectedIndex === 1 ? "active" : ""}
                   onClick={() => this.onNavigate(1)}>Equations</a>
            </nav>
            <section className="content">foo</section>
        </div>
    }

    // Tab pages should be <section>
}