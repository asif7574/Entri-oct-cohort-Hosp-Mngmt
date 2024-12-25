import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        
        name: {
            type:String
        },
        patient: { type: mongoose.Types.ObjectId, ref: "Patient" },
        department: {
            type:String,
            enum: ["Surgery","General OP","Ent","Gynecology","Orthopedics","Cardiology","Pulmonology"],

        },
        doctor: { type: mongoose.Types.ObjectId, ref: "Employee" },
        date: {
            type:String
        },
        time: {
            type:String
        },
        status: {
            type:String,
            enum: ["Waitig for Approval","Booked ","Completed","Canceled"],
        },
    },
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);