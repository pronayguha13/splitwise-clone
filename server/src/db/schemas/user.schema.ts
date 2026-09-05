import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    rememberMe: {
        type: Boolean,
        requied: false,
        default: false,
    },
});

export default UserSchema;
