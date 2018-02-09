import React from "react";

import "./MiniSidebar.styl";

// TODO: Move this to the real Sidebar and get rid of the pubsub coupling
export default class MiniSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hidden: props.hidden };
    }

    componentWillReceiveProps(next) {
        if (next.hidden !== this.state.hidden) {
            this.setState({ hidden: next.hidden });
        }
    };

    render() {
        const icons = this.props.icons.map((icon, idx) => {
            return <a href="#" key={idx} onClick={() => this.props.onSelect(idx)}>
                <i className={`fa ${icon}`} />
            </a>
        });
        const cls = this.state.hidden ? "hidden" : "";

        return <div className={`qoc-mini-sidebar ${cls}`}>
            <p>Q</p>
            {icons}
        </div>
    }
}