import React from "react";

import "./Sidebar.styl"
import LoginBox from "../LoginBox";
import TabToolbox from "../TabToolbox";
import EquationList from "../EquationList"

export default class Sidebar extends React.Component {
    render() {
        return <div className="qoc-sidebar">
            <header>
                <h1>
                    Quantum of Cells
                    <a href="#"><i className="fa fa-bars"/></a>
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