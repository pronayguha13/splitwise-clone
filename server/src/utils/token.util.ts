import { Types } from "mongoose";
import { sign } from "jsonwebtoken";
import TokenModel from "../db/models/token.model";

const getJwtSecret = (environmentVariable: string): string => {
    const secret = process.env[environmentVariable];

    if (!secret) {
        throw new Error(`${environmentVariable} is not configured`);
    }

    return secret;
};

export const generateAccessToken = (userId: Types.ObjectId): string => {
    return sign({ sub: userId.toString() }, getJwtSecret("JWT_ACCESS_SECRET"), {
        expiresIn: "15m",
    });
};

export const invalidateToken = async (
    userId: Types.ObjectId,
): Promise<boolean> => {
    try {
        await TokenModel.findOneAndUpdate(
            { user: userId, isExpired: false },
            { isExpired: true },
        );

        return true;
    } catch {
        return false;
    }
};

export const generateToken = async (
    userId: Types.ObjectId,
): Promise<string> => {
    try {
        const oldTokenRevoked = await invalidateToken(userId);

        if (!oldTokenRevoked) {
            throw new Error("The old refresh token could not be revoked");
        }

        const refreshToken = sign(
            { sub: userId.toString() },
            getJwtSecret("JWT_REFRESH_SECRET"),
            { expiresIn: "7d" },
        );

        const token = new TokenModel({
            user: userId,
            refreshToken,
        });

        await token.save();
        return refreshToken;
    } catch (error) {
        throw error;
    }
};
