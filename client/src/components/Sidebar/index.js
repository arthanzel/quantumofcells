import React from "react";

import MiniSidebar from "../MiniSidebar";
import TabToolbox from "../TabToolbox";
import EquationList from "../EquationList";
import SettingsPanel from "../SettingsPanel";
import LoginBox from "../LoginBox";
import "./Sidebar.styl";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minimized: props.minimized || false,
            selectedIndex: this.props.selectedIndex || 0
        }
    }

    onHide = () => {
        this.setState({ minimized: true });
    };

    onMiniSidebarSelect = (index) => {
        this.setState({
            minimized: false,
            selectedIndex: index
        });
    };

    render() {
        const hideMiniSidebar = !this.state.minimized;
        const cls = this.state.minimized ? "hidden" : "";

        return <div className="qoc-sidebar-container">
            <MiniSidebar hidden={hideMiniSidebar}
                         icons={["fa-folder-open", "fa-tasks", "fa-gears"]}
                         onSelect={this.onMiniSidebarSelect} />
            <div className={`qoc-sidebar ${ cls }`}>
                <header>
                    <h1>
                        Quantum of Cells
                        <a href="#" onClick={this.onHide}><i className="fa fa-bars" /></a>
                    </h1>
                </header>

                <TabToolbox titles={["Projects", "Equations", "Settings"]} selectedIndex={this.state.selectedIndex}>
                    <p>Projects</p>
                    <EquationList />
                    <SettingsPanel />
                </TabToolbox>

                <LoginBox />
            </div>
        </div>
    }
}