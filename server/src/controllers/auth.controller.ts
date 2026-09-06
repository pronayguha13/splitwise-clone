import { generateToken } from "./../utils/token.util";
import { comparePassword, hashPassword } from "./../utils/password.util";
import { NextFunction, Request, Response } from "express";
import { SignupBody } from "../schemas/auth.schema";
import UserModel from "../db/models/user.model";
import { HttpError } from "../errors/httpError";
import { generateAccessToken } from "../utils/token.util";
import { decode } from "jsonwebtoken";
import { Types } from "mongoose";

export const signUpController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { username, email, password, rememberMe } =
            req.body as SignupBody;

        //check if the email or username exists already in the database or not
        const targetUser = await UserModel.findOne({ email: email });

        if (targetUser) {
            throw new HttpError(409, "Email already exists");
        }

        // Hash the password with bcrypt and salt
        const hashedPassword = await hashPassword(password);

        // Create new user with hashed password
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            rememberMe,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const signInController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email }).select(
            "_id username email password",
        );

        if (!user) {
            throw new HttpError(401, "Invalid Credentials", {
                status: false,
            });
        }
        //compare password
        const isPasswordMatch = await comparePassword(password, user.password);

        if (isPasswordMatch) {
            const accessToken = generateAccessToken(user._id);
            const refreshToken = await generateToken(user._id);

            return res.status(200).json({
                success: true,
                message: "Successfully logged in",
                accessToken,
                refreshToken,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
        }
    } catch (error) {
        next(error);
    }
};

export const refreshController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { refreshToken } = req.body;

        const tokenDetails = decode(refreshToken, { json: true });

        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (
            !tokenDetails ||
            !tokenDetails.iat ||
            !tokenDetails.exp ||
            tokenDetails.exp < currentTimestamp
        ) {
            throw new HttpError(401, "Invalid refresh token");
        }

        const newRefreshToken = await generateToken(
            tokenDetails.sub! as unknown as Types.ObjectId,
        );

        if (!newRefreshToken) {
            throw new HttpError(500, "Something went wrong");
        }

        const newAccessToken = generateAccessToken(
            tokenDetails.sub! as unknown as Types.ObjectId,
        );

        res.status(200).json({
            refreshToken: newRefreshToken,
            accessToken: newAccessToken,
        });
    } catch (error) {
        next(error);
    }
};
