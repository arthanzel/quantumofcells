import React from "react";

import Sidebar from "../Sidebar";
import QChart from "../QChart";
import "./QOCApplication.styl";

export default class QOCApplication extends React.Component {
    render() {
        return <div className="qoc-app-container">
            <Sidebar />
            <QChart />
        </div>
    }
}