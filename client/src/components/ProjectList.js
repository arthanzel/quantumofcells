import React from "react";
import request from "superagent";

import { accessToken } from "qoc/authHelper";

export default class ProjectList extends React.Component {
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
        request.get("http://lvh.me:5000/projects")
            .set("Authorization", "Bearer " + accessToken())
            .then((res) => {

            })
            .catch((err) =>{

            });
    }

    onAddProject = () => {
        request.post("http://lvh.me:5000/projects")
            .set("Authorization", "Bearer " + accessToken())
            .then((res) => {
                console.log(res.body);
            })
            .catch((err) =>{

            });
    };

    render() {
        return <div>
            <header>
                <h2>Projects</h2>
                <a href="#" className="btn btn-primary btn-sm" onClick={this.onAddProject}>Add Equation</a>
            </header>
        </div>
    }
}