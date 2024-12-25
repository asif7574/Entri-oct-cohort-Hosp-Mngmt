import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema(
    {
        // user doc mucous single diagnosis->trim
        //user and doc object id =>in opModel

        diagnosis: {
            type: String,
            // required: true, 
            // trim: true,
        },
        mucous_membrane: {
            type: String,
            enum: ["Pale","pale Rosette","Pappery White","Pale Pink","Congested","Reddish"],
        },
        heart_beat: {
            type: String,
            enum: ["Normal","TachyCardia","BradyCardia","Shallow","for Detailed Review"],
        },
       
    },
    { timestamps: true }
);

export const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);