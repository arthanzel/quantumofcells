import React from "react";
// import { Modal } from "reactstrap";
import PropTypes from "prop-types";

export default class CreateProjectForm extends React.Component {
    static defaultProps = {
        onSubmit: () => {
        }
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
        return <form onSubmit={this.handleSubmit}>
            <h2>Create a Project</h2>
            <div className="form-group">
                <input id="name" className="form-control" placeholder="Name" type="text" value={this.state.value} onChange={this.handleChange} />
                <small class="form-text text-muted">Choose wisely, because the name can't be changed later.</small>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Create" />
            </div>
        </form>
    }
};