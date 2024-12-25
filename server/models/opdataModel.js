import mongoose from "mongoose";

const opdataSchema = new mongoose.Schema(
    {
       
        op_Id:{
            type:Number,
            minLength: 8,
            maxLength: 8, 
        },
        date: {
            type:String
        },
        name: {
            type:String
        },
        patient: { type: mongoose.Types.ObjectId, ref: "Patient" },
        department: {
            type:String,
            enum: ["Surgery","General OP","ENT","Gynecology","Orthopedics","Cardiology","Pulmonology"],

        },
        doctor: { type: mongoose.Types.ObjectId, ref: "Employee" },
        prescription:{
            type: String,
            default:null,
        },
        diagnosis:{
            type: String,
            default:null,
            
        },
        status:{
            type: String,
            enum: ["ACTIVE","CONSULTED","DISPENSED","OUT"]
        },
        reception_bill:{
            type:Number,
            default:0
        },
        pharmacy_bill:{
            type:Number,
            default:0
        },
        total_bill:{
            type:Number,
            default:0
        },


  
    },
    { timestamps: true }
);

export const Opdata = mongoose.model("Opdata", opdataSchema);



