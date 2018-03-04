import React from "react";

import Sidebar from "./Sidebar";
import QChart from "./QChart";
import ToastBar from "./ToastBar";
import "./QOCApplication.styl";

export default class QOCApplication extends React.Component {
    render() {
        return <React.Fragment>
            <div className="qoc-app-container">
                <Sidebar selectedIndex={1} />
                <QChart />
            </div>
            <ToastBar />
        </React.Fragment>
    }
}