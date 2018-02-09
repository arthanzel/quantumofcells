import React from "react";

import MiniSidebar from "../MiniSidebar";
import Sidebar from "../Sidebar";
import QChart from "../QChart";
import "./QOCApplication.styl";

export default class QOCApplication extends React.Component {
    render() {
        return <div className="qoc-app-container">
            <MiniSidebar hidden={true} />
            <Sidebar />
            <QChart />
        </div>
    }
}