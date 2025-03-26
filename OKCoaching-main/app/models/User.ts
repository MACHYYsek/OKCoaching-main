import { Schema, model, models } from "mongoose";

interface IUser extends Document {
    email: string;
    password?: string; // Password is optional, as Google users may not have it
    provider: "credentials" | "google";
}

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid"],
        },
        password: {
            type: String,
            select: false,
            required: function (this: IUser): boolean {
                return this.provider === "credentials";
            },
        },
        provider: {
            type: String,
            required: true,
            enum: ["credentials", "google"],
            default: "credentials",
        },
        resetPasswordToken: {
            type: String,
            required: false,
        },
        resetPasswordExpires: {
            type: Date,
            required: false,
        },
        userName: {
            type: String,
            required: false,
        },
        bornDate: {
            type: String,
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
        weight: {
            type: Number,
            required: false,
        },
        height: {
            type: Number,
            required: false,
        },
        PRs: {
            bench: {
                type: Number,
                required: false,
            },
            deadlift: {
                type: Number,
                required: false,
            },
            squat: {
                type: Number,
                required: false,
            },
            pullUps: {
                type: Number,
                required: false,
            },
        },
        trainingGroup: {
            type: String,
            required: false,
        },
        paid: {
            type: Boolean,
            required: false,
            default: false,
        },
        role: {
            type: String,
            required: true,
            default: "user",
        },
        profileCompleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);
export default User;
