import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        employeeID: {
            type: Number,
            required: true,
            maxLength:5,
            minLength:5,
            // unique:true,
        },
        name: {
            type: String,
            required: true,
            maxLength: 30,
        },
        email: {
            type: String,
            required: true,
            // unique: true,
            minLength: 5,
            maxLength: 30,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        mobile: {
            type: Number,
            required: true,
            maxLength: 13,
        },
        address: {
            type: String,
            // required: true,
        },
        department:{
            type: String,
            enum: ["Surgery","General OP","ENT","Gynecology","Orthopedics","Cardiology","Pulmonology"],
        },
        
        role: {
            type: String,
            enum: ["staff","doctor","nurse","pharmacist","receptionist","accountant","lab_technician","ot_staff","accountant","admin"],
            default: "staff",
            // required: true,
        },
        control_role: {
            type: String,
            enum: ["staff","doctor","nurse","pharmacist","receptionist","accountant","lab_technician","ot_staff","accountant","admin",null],
            default:null,
            // required: true,
        },
        profiePic: {
            type: String,
            default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
        },
    },
    { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);