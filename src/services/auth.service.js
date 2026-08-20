import {findUserByEmail,createUser,findUserById} from "../models/user.model.js";
import crypto from "crypto";
import { createRefreshToken,findRefreshToken,deleteRefreshToken} from "../models/refreshToken.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/errors.js";

const registerUserService = async({ name, email, password, role })=>{
    try{
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw new AppError("User already exists", 409);
}       
console.log(existingUser);
        const hashedPassword=await bcrypt.hash(password,10);
            const user=await createUser({name,email,password:hashedPassword,role});
            return user;
    }catch (err) {
    throw err;
}
}

const loginUserService = async ({ email, password }) => {
    try {
        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            throw new AppError("Invalid email or password", 401);
        }
        console.log("Input Password:", password);
console.log("DB Password:", existingUser.password);
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            throw new AppError("Invalid email or password", 401);
        }

        const accessToken = jwt.sign(
            {
                id: existingUser.id,
                role: existingUser.role
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
            }
        );

        const refreshTokenData = await createRefreshTokenService(
            existingUser.id
        );

        return {
            accessToken,
            refreshToken: refreshTokenData.refreshToken
        };
    } catch (err) {
        throw err;
    }
};

const createRefreshTokenService = async(userId)=>{
    try{
          const refreshToken = crypto.randomBytes(64).toString("hex");
          const tokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

        const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
        );
        const result = await createRefreshToken(userId,tokenHash,expiresAt);
        return {
        refreshToken,
        expiresAt
    };

    } catch(err){
        throw err;
    }
}
const refreshTokenService = async (refreshToken) => {
    try {

        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const storedToken = await findRefreshToken(tokenHash);

        if (!storedToken) {
            throw new AppError("Invalid refresh token", 401);
        }

        if (new Date() > new Date(storedToken.expires_at)) {
            throw new AppError("Refresh token expired", 401);
        }

        const user = await findUserById(storedToken.user_id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const accessToken = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
            }
        );

        return {
            accessToken
        };

    } catch (err) {
        throw err;
    }
};
const deleteRefreshTokenService = async (refreshToken) => {
    try {

        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        const deleteToken = await deleteRefreshToken(tokenHash);

        if (!deleteToken) {
            throw new AppError("Invalid refresh token", 401);
        }

        return {
            message: "Logout successful"
        };

    } catch (err) {
        throw err;
    }
}

export {registerUserService,
    loginUserService,
    createRefreshTokenService,
    refreshTokenService,
    deleteRefreshTokenService};


