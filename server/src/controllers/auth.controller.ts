import { comparePassword, hashPassword } from "./../utils/password.util";
import { NextFunction, Request, response, Response } from "express";
import { SignupBody } from "../schemas/auth.schema";
import UserModel from "../db/models/user.model";
import { HttpError } from "../errors/httpError";

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
            return res.status(200).json({
                success: true,
                message: "Successfully logged in",
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
