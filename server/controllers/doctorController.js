import { Appointment } from "../models/appointmentModel.js";
import { Opdata } from "../models/opdataModel.js";
import { Patient } from "../models/patientModel.js";





export const updateOpDataD = async (req, res, next) => {
    try {
        

        

        res.json({ message: "op-data fetched", });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
export const getWaitingAp= async (req, res, next) => {
    try {
        // console.log(req.employee);
        const docId=req.employee.id
        
        
        const apData = await Appointment.find({doctor:docId , status: "Waitig for Approval" }).sort({ createdAt: -1 }).populate("doctor").populate("patient"); 
       
        
        res.json({ message: "Waiting Appointment data fetched", data: apData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
export const getDocOp= async (req, res, next) => {
    try {
        // console.log(req.employee);
        const docId=req.employee.id
        
        
        const apData = await Opdata.find({ doctor:docId ,status: "ACTIVE" }).sort({ createdAt: -1 }).populate("doctor").populate("patient"); 
       
        
        res.json({ message: "Active op data fetched", data: apData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



export const prescribeOp= async (req,res,next)=>{
    try {
        const { opId } = req.params;
        
        const {diagnosis,prescription}=req.body;

        const statusD="CONSULTED"
        
        if( !diagnosis || !prescription  ){
            return res.status(400).json({message:"all fields are required"})
        }
       console.log(opId);
       
       
        const updatedRecord = await Opdata.findOneAndUpdate(
            { _id: opId }, // Find by ID
            { diagnosis, prescription, status:statusD }, // Update fields
             // Return the updated document
        );
        
        console.log(updatedRecord);
        
        
        res.json({message:"Op prescribed ",data:updatedRecord})
        
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}