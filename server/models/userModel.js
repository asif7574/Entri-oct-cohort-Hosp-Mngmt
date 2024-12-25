import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userID: {
            type: Number,
            maxLength:8,
            minLength:8,
            unique:true,
        },
        name: {
            type: String,
            required: true,
            maxLength: 30,
        },
        email: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 30,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 15,
        },
        mobile: {
            type: String,
            required: true,
            maxLength: 13,
        },
        address: {
            type: String,
        },
        age: {
            type: Number,
            required: true,
        },
        sex: {
            enum:["male","female","rather not say"],

        },
        profiePic: {
            type: String,
            default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);