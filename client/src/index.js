import React from "react";
import ReactDOM from "react-dom";

import QOCApplication from "components/QOCApplication";

ReactDOM.render(<QOCApplication />, document.getElementById("qoc-app-container"));

// class Equation extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return <div>
//             Equation { this.props.body }
//         </div>;
//     }
// }
//
// ReactDOM.render(<Equation body="2+4" />, document.getElementById("react-root"));
