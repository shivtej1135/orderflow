const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "Forbidden"
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};

export default authorize;