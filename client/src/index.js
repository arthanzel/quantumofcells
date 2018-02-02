import React from "react";
import ReactDOM from "react-dom";

class Equation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            Equation { this.props.body }
        </div>;
    }
}

ReactDOM.render(<Equation body="2+4" />, document.getElementById("react-root"));
