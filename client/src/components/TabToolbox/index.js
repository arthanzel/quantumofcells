import React from "react";
import postal from "postal";

import actions from "reducers/actions";

import "./TabToolbox.styl";

const qocChannel = postal.channel("qoc");

export default class TabToolbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedIndex: props.selectedIndex || 0 };
    }

    componentDidMount() {
        this.subscription = qocChannel.subscribe("sidebar", (data) => {
            if (data.type === actions.MAXIMIZE_SIDEBAR) {
                this.setState({ selectedIndex: data.index });
            }
        });
    }

    onNavigate = (index) => {
        this.setState({ selectedIndex: index });
    };

    render() {
        const links = this.props.titles.map((val, idx) => {
            return <a href="#"
                      key={idx}
                      className={this.state.selectedIndex === idx ? "active" : ""}
                      onClick={() => this.onNavigate(idx)}>{val}</a>;
        });

        return <div className="qoc-tab-toolbox">
            <nav>{links}</nav>
            <section className="content">{this.props.children[this.state.selectedIndex]}</section>
        </div>
    }
}