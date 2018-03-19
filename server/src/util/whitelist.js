export default function whitelist(obj, fields) {
    const _obj = {};
    for (const prop of fields) {
        _obj[prop] = obj[prop];
    }
    return _obj;
};