import React from "react";
import postal from "postal";

import actions from "reducers/actions";

import LoginBox from "../LoginBox";
import TabToolbox from "../TabToolbox";
import EquationList from "../EquationList"
import "./Sidebar.styl"

const qocChannel = postal.channel("qoc");

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hidden: props.hidden }
    }

    onHide = () => {
        qocChannel.publish("sidebar", { type: actions.MINIMIZE_SIDEBAR });
        this.setState({ hidden: true });
    };

    render() {
        const cls = this.state.hidden ? "hidden" : "";
        return <div className={`qoc-sidebar ${ cls }`}>
            <header>
                <h1>
                    Quantum of Cells
                    <a href="#" onClick={this.onHide}><i className="fa fa-bars"/></a>
                </h1>
            </header>

            <TabToolbox titles={["Projects", "Equations", "Settings"]} selectedIndex={1}>
                <p>Projects</p>
                <EquationList/>
                <p>Settings</p>
            </TabToolbox>

            <LoginBox/>
        </div>
    }
}