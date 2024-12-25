import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        patientID: {
            type: Number,
            required: true,
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
            // required: true,
            minLength: 5,
            maxLength: 30,
            default:"sample@gmail.com",
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
            type:String,
            enum:["Male","Female","Other"],

        },
        opIds: [{ type: mongoose.Types.ObjectId, ref: "Opdata" }],
        profiePic: {
            type: String,
            default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
        },
    },
    { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);