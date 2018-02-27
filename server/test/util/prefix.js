/**
 * Prefixes the server's root URL to a path.
 * Example: `prefix("/projects")` might return `http://localhost:8080/projects`.
 * The root URL is fetched from the ROOT_URL environment variable, or set in `.env`.
 * @param path Path to a route or resource.
 * @returns {String} The full URL.
 */
export default function prefix(path) {
    if (!process.env.ROOT_URL) {
        console.warn("ROOT_URL is unset!");
    }
    return process.env.ROOT_URL + path;
}