import React from "react";

import "./Sidebar.styl"
import LoginBox from "../LoginBox";
import TabToolbox from "../TabToolbox";

export default class Sidebar extends React.Component {
    render() {
        return <div className="qoc-sidebar">
            <header>
                <h1>
                    Quantum of Cells
                    <a href="#"><i className="fa fa-bars"/></a>
                </h1>
            </header>

            <TabToolbox />

            <LoginBox />
        </div>
    }
}