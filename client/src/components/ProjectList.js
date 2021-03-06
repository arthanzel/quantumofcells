import Icon from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types";
import React from "react";
import { Modal } from "reactstrap";
import request from "superagent";

import { accessToken, webAuth } from "qoc/util/authUtils";
import actions from "reducers/actions";
import { makeToast, messageChannel as channel, MESSAGE_CHANGE_SIDEBAR_TAB } from "qoc/util/notifyUtils";
import sampleProjects from "qoc/sampleProjects";
import { serverPath } from "qoc/util/dataUtils";
import store from "qoc/store";

import "./ProjectList.styl";
import LoggedIn from "./LoggedIn";
import CreateProjectForm from "./CreateProjectForm";

export default class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dialogOpen: false, projects: null };
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

        request.get(serverPath("/projects"))
            .set("Authorization", "Bearer " + accessToken())
            .then((res) => {
                store.dispatch({ type: actions.LOAD_PROJECTS, projects: res.body.projects });
            })
            .catch((err) => {
                // console.error(err);
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

    createProject = (name) => {
        const me = this;
        request.post(serverPath("/projects"))
            .set("Authorization", "Bearer " + accessToken())
            .send({ name: name })
            .then((res) => {
                me.setState({ dialogOpen: false });
                store.dispatch({ type: actions.ADD_PROJECT, project: res.body.project });
                store.dispatch({ type: actions.LOAD_PROJECT, project: res.body.project });
                channel.publish(MESSAGE_CHANGE_SIDEBAR_TAB, 1);
            })
            .catch((err) => {
                console.error("Can't create project!");
                console.error(err);
                me.setState({ dialogOpen: false });
                // TODO: Show message
            });
    };

    deleteProject = (project) => {
        request.delete(serverPath("/projects/" + project._id))
            .set("Authorization", "Bearer " + accessToken())
            .then((res) => {
                store.dispatch({ type: actions.DELETE_PROJECT, _id: project._id });
                makeToast(`Project '${ project.name }' was deleted`)

            })
            .catch((err) => {
                console.error("Unable to delete project", err);
            });
    };

    selectProject = (project) => {
        store.dispatch({ type: actions.LOAD_PROJECT, project: project });
        channel.publish(MESSAGE_CHANGE_SIDEBAR_TAB, 1);
    };

    toggleDialog = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        });
    };

    handleCreateProject = (name) => {
        this.createProject(name);
    };

    render() {
        return <div className="equationContainer">
            <header>
                <h3>Projects</h3>
                <LoggedIn>
                    <a href="#" className="btn btn-primary btn-sm" onClick={this.toggleDialog}>New Project</a>
                </LoggedIn>
            </header>
            <LoggedIn>
                {this.state.projects === null ?
                    // Projects haven't been fetched yet
                    <p style={{ textAlign: "center" }}>
                        Loading...<br />< br />
                        <Icon icon="spinner" pulse />
                    </p>
                    :
                    <InnerProjectList projects={this.state.projects}
                                      onSelectProject={this.selectProject}
                                      onDeleteProject={this.deleteProject}
                                      onCreateProject={this.toggleDialog} />
                }
            </LoggedIn>
            <LoggedIn.LoggedOut>
                <a href="#" onClick={() => webAuth.authorize()} style={{ padding: 7 }}>
                    Log in to see your projects
                </a>
            </LoggedIn.LoggedOut>

            <header>
                <h3>Sample Projects</h3>
            </header>
            <InnerProjectList projects={sampleProjects} onSelectProject={this.selectProject} />

            <Modal isOpen={this.state.dialogOpen} toggle={this.toggleDialog}>
                <CreateProjectForm onSubmit={this.handleCreateProject} onCancel={this.toggleDialog} />
            </Modal>
        </div>
    }
}

class InnerProjectList extends React.Component {
    static defaultProps = {
        projects: [],
        onCreateProject: null,
        onDeleteProject: null,
        onSelectProject: () => {
        }
    };

    static propTypes = {
        deletable: PropTypes.bool,
        projects: PropTypes.array,
        onCreateProject: PropTypes.func,
        onDeleteProject: PropTypes.func,
        onSelectProject: PropTypes.func
    };

    makeDeleteCallback = (project) => {
        if (this.props.onDeleteProject === null) {
            return null;
        }
        return () => {
            this.props.onDeleteProject(project)
        };
    };

    render() {
        const projects = this.props.projects.map((project) => {
            return <Project name={project.name} id={project._id} key={project._id}
                            onSelect={() => this.props.onSelectProject(project)}
                            onDelete={this.makeDeleteCallback(project)} />
        });

        return <div className="projects">
            {this.props.projects.length === 0 ?
                <p>
                    You have no projects.&nbsp;
                    {this.props.onCreateProject ?
                        <a href="#" onClick={this.props.onCreateProject}>Create one!</a>
                        :
                        null
                    }
                </p>
                :
                projects
            }
        </div>
    }
}

class Project extends React.Component {
    static defaultProps = {
        name: "",
        id: "",
        onDelete: null,
        onSelect: () => {
        }
    };

    static propTypes = {
        deletable: PropTypes.bool,
        name: PropTypes.string,
        id: PropTypes.string,
        onDelete: PropTypes.func,
        onSelect: PropTypes.func
    };

    render() {
        return <div className="project">
            <a href="#" onClick={this.props.onSelect}>
                {this.props.name}
            </a>
            {this.props.onDelete === null ? null :
                <a href="#" onClick={this.props.onDelete}>Delete</a>
            }
        </div>
    }
}