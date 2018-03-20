import React from "react";
// import { Modal } from "reactstrap";
import PropTypes from "prop-types";

export default class CreateProjectForm extends React.Component {
    static defaultProps = {
        onSubmit: () => {}
    };

    static propTypes = {
        onSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = { value: "" };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.value);
    };

    render() {
        return <form>
            <h2>Create a Project</h2>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <div>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        </form>
    }
};