/**
 * Generates a middleware function that checks if the current user has access to a database object that they're trying to edit.
 * A user has access if and only if an object exists with the provided ID, and if that object's <code>user</code> field
 * matches the user's <code>sub</code> identity (which is provided by the auth API).
 * The ID is provided as a route parameter, e.g. <code>/projects/{ID}</code>.
 * @param modelClass Mongoose model class to check.
 * @returns {Function} The middleware function.
 */
export default function checkOwnership(modelClass) {
    return function(req, res, next) {
        if (!req.user || !req.user.sub) {
            // This shouldn't happen, because checkJwt ensures that the user is populated.
            // Even so, make sure that you catch error here rather than in a db query.
            // TODO: Associate this with an error code.
            throw { status: 401 };
        }

        const query = { _id: req.param.id, user: req.user };
        modelClass.findOne(query, (err, doc) => {
            if (doc) {
                next();
            }
            else {
                throw { status: 401 };
            }
        });
    };
}
