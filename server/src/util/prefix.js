import { URL } from "url";

export default function prefix(path) {
    if (!process.env.ROOT_URL) {
        console.warn("ROOT_URL is unset!");
    }
    return process.env.ROOT_URL + path;
}