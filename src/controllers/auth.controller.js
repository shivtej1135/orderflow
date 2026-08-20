import { createRefreshTokenService } from "../services/auth.service.js";
import { loginUserService,registerUserService,refreshTokenService,deleteRefreshTokenService } from "../services/auth.service.js";

const createRefreshTokenController = async (req, res, next) => {
    const id = req.user.id;
    try {
        const result = await createRefreshTokenService(id);

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const loginUserController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const result = await loginUserService({email,password});

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const registerUserController = async(req,res,next)=>{
    try{
        
        const {name,email,password,role}=req.body;
        const user = await registerUserService({name,email,password,role});
        return res.status(201).json({
            message: "User registered successfully",
            user,
            });
    }catch(err){
    next(err);

    }
}

const refreshTokenController = async (req, res, next) => {
    const { refreshToken } = req.body;

    try {
        const result = await refreshTokenService(refreshToken);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const logoutController = async (req, res, next) => {
    const { refreshToken } = req.body;

    try {
        const result = await deleteRefreshTokenService(
            refreshToken
        );

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export {createRefreshTokenController,
    loginUserController,
    registerUserController,
    refreshTokenController,
    logoutController};

