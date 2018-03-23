import cuid from "cuid";

export  function uid() {
    return cuid();
}

export function serverPath(path) {
    return CONFIG.serverUrl + path;
};