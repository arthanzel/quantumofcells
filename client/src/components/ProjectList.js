import PropTypes from "prop-types";
import React from "react";
import request from "superagent";

import { accessToken } from "qoc/authHelper";
import actions from "reducers/actions";
import sampleProjects from "sampleProjects";
import store from "qoc/store";

export default class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dialogShown: false, projects: [] };
    }

    componentDidMount() {
        /*
        This isn't well-documented in the Superagent API.
        When using Promises and a request throws an error (any 400, 500, or unhandled 300 status),
        Superagent throws an exception instead of resolving the promise.
        To handle errors, add a `catch` callback.
        The response is provided in the `response` field of the error.
        The error doesn't log well, so to inspect it, do `console.dir(err)`.
         */

        // TODO: Hardcoded URL
        request.get(process.env.SERVER_URL + "/projects")
            .set("Authorization", "Bearer " + accessToken())
            .then((res) => {
                store.dispatch({ type: actions.LOAD_PROJECTS, projects: res.projects });
            })
            .catch((err) => {

            });

        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (state.projects !== this.state.projects) {
                this.setState({ projects: state.projects });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    showNewProjectDialog = () => {
        this.setState({ dialogShown: true });
    };

    createProject = (name) => {
        const me = this;
        request.post(process.env.SERVER_URL + "/projects")
            .set("Authorization", "Bearer " + accessToken())
            .send({ name: name })
            .then((res) => {
                me.setState({ dialogShown: false });
                store.dispatch({ type: actions.LOAD_PROJECTS, projects: res.body.projects });
            })
            .catch((err) => {
                console.error("Can't create project!");
                console.error(err);
                me.setState({ dialogShown: false });
                // TODO: Show message
            });
    };

    render() {
        const projects = this.state.projects.map((project) => {
            return <Project name={project.name} _id={project._id} />;
        });
        const samples = [];
        for (const key in sampleProjects) {
            const project = sampleProjects[key];
            samples.push(<Project name={project.name} _id={project._id} key={key}/>);
        }

        return <div className="equationContainer">
            <header>
                <h2>Projects</h2>
                <a href="#" className="btn btn-primary btn-sm" onClick={this.showNewProjectDialog}>New Project</a>
            </header>
            <div className="projects">
                {this.state.projects.length === 0 ?
                    <div>empty</div>
                    :
                    <div>{projects}</div>
                }
                <div>{samples}</div>
            </div>
        </div>
    }
}

class Project extends React.Component {
    static defaultProps = {
        name: "",
        _id: ""
    };

    static propTypes = {
        name: PropTypes.string,
        _id: PropTypes.string
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.name}</div>
    }
}