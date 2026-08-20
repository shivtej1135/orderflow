import jwt from "jsonwebtoken";
import { findUserById } from "../models/user.model.js";
const verifyToken = async (req, res, next) => {
    const authHeaderValue = req.headers.authorization;

    if (!authHeaderValue) {
        return res.status(401).json({
            message: "Authorization token is missing"
        });
    }

    const [type, token] = authHeaderValue.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization header"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );

        const user = await findUserById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export { verifyToken };