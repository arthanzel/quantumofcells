import React from "react";
// import { Modal } from "reactstrap";
import PropTypes from "prop-types";

export default class CreateProjectForm extends React.Component {
    static defaultProps = {
        onCancel: () => {
        },
        onSubmit: () => {
        }
    };

    static propTypes = {
        onCancel: PropTypes.func,
        onSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = { value: "" };
    }

    componentDidMount() {
        setTimeout(() => this.input.focus(), 0); // Won't focus without the timeout for some reason
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
    };

    render() {
        return <form onSubmit={this.handleSubmit}>
            <h2>Create a Project</h2>
            <div className="form-group">
                <input type="text"
                       id="name"
                       className="form-control"
                       placeholder="Name"
                       ref={(me) => {
                           this.input = me;
                       }}
                       value={this.state.value} onChange={this.handleChange} />
                <small className="form-text text-muted">Choose wisely, because the name can't be changed later.</small>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Create" />
                &nbsp;
                <button className="btn btn-outline-secondary" style={{ float: "right" }}
                        onClick={this.props.onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    }
};