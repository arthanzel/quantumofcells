import React from "react";

import "./TabToolbox.styl";

export default class TabToolbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedIndex: 0};
    }

    onNavigate = (index) => {
        this.setState({selectedIndex: index});
    };

    render() {
        const links = this.props.titles.map((val, idx) => {
            return <a href="#"
                      key={idx}
                      className={this.state.selectedIndex === idx ? "active" : ""}
                      onClick={() => this.onNavigate(idx)}>{ val }</a>;
        });

        return <div className="qoc-tab-toolbox">
            <nav>{ links }</nav>
            <section className="content">{ this.props.children[this.state.selectedIndex] }</section>
        </div>
    }
}