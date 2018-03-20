import React from "react";

import channel from "qoc/channel";

import "./TabToolbox.styl";

export default class TabToolbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedIndex: props.selectedIndex || 0 };
    }

    componentDidMount() {
        this.subscription = channel.subscribe(channel.CHANGE_SIDEBAR_TAB, (index) => {
            this.setState({ selectedIndex: index })
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    componentWillReceiveProps(next) {
        if (next.selectedIndex !== this.state.selectedIndex) {
            this.setState({ selectedIndex: next.selectedIndex });
        }
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