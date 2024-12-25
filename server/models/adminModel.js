import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        adminID: {
            type: Number,
            required: true,
            maxLength:3,
            minLength:3,
            // unique:true,
        },
        name: {
            type: String,
            required: true,
            maxLength: 30,
        },
       
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        role:{
            type: String,
            default:"admin"
        }
       
    },
);

export const Admin = mongoose.model("Admin", adminSchema);