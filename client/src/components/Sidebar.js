import React from "react";
import Icon from "@fortawesome/react-fontawesome";

import { version } from "../../package";

import MiniSidebar from "./MiniSidebar";
import TabToolbox from "./TabToolbox";
import ProjectList from "./ProjectList";
import EquationList from "./EquationList";
import SettingsPanel from "./SettingsPanel";
import LoginBox from "./LoginBox";
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
                         icons={["folder-open", "chart-line", "cog"]}
                         onSelect={this.onMiniSidebarSelect} />
            <div className={`qoc-sidebar ${ cls }`}>
                <header>
                    <h1>
                        Quantum of Cells
                        <small style={{ fontSize: "0.5em" }}> {version}</small>
                        <a href="#" onClick={this.onHide}>
                            <Icon icon="bars" />
                        </a>
                    </h1>
                </header>

                <TabToolbox titles={["Projects", "Equations", "Settings"]} selectedIndex={this.state.selectedIndex}>
                    <ProjectList />
                    <EquationList />
                    <SettingsPanel />
                </TabToolbox>

                <LoginBox />
            </div>
        </div>
    }
}