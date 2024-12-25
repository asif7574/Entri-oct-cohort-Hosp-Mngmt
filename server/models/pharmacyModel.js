import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema(
    {
        bill_number:{
            type:Number,
            minLength: 8,
            maxLength: 8, 
            required: true,
        },
        op_number: { 
            type: Number,
            minLength: 8,
            maxLength: 8, 
            required: true,

        },
        medicines: [{ 
            medicine:{
                type: mongoose.Types.ObjectId, 
                ref: "Drug"
            },
            quantity:{
                type:Number,
            },
            _id: false,
            
           }],
        total_amount:{
            type:Number,
            required: true,
        },
        pharmacist: { type: mongoose.Types.ObjectId, ref: "Employee" },
    },
    { timestamps: true }
);

export const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

