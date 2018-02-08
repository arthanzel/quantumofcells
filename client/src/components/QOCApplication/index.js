import React from "react";

import Sidebar from "../Sidebar";
import "./QOCApplication.css";

export default class QOCApplication extends React.Component {
    render() {
        return <div className="qoc-app-container">
            <Sidebar/>
            <div>Body</div>
        </div>
    }
}