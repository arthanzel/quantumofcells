import React from "react";
import ReactDOM from "react-dom";

import QOCApplication from "components/QOCApplication";

import "index.styl"

// Create the Redux store
import "qoc/store";

ReactDOM.render(<QOCApplication />, document.getElementById("qoc-app-container"));
