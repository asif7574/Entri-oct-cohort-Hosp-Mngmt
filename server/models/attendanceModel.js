import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        date: {
            type:Date
        },
        attendance:[{
        employee: { type: mongoose.Types.ObjectId, ref: "Employee" },
        present:{
            type:Boolean,
            default:false,
        },
    }],
    },
    { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);