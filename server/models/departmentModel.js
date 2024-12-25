import mongoose from "mongoose";

const deptSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 15,
        },
        head: { type: mongoose.Types.ObjectId, ref: "Employee" },
        doctors: [{ type: mongoose.Types.ObjectId, ref: "Employee" }],
        nurses: [{ type: mongoose.Types.ObjectId, ref: "Employee" }],
        staffs: [{ type: mongoose.Types.ObjectId, ref: "Employee" }],
        
        
    },
);

export const Dept = mongoose.model("Dept", deptSchema);