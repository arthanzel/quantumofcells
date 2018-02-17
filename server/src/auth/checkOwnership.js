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
