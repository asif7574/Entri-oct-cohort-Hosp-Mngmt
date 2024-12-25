import { Appointment } from "../models/appointmentModel.js";
import { Opdata } from "../models/opdataModel.js";

import { Patient } from "../models/patientModel.js";




export const createPatient= async (req,res,next)=>{
    try {
        const lastPatient= await Patient.findOne().sort({ createdAt: -1 });
        const lastId=lastPatient.patientID
        const newId=lastId + 1
        // const newId=11223344
        


        const {name,email,mobile,address,sex,age}=req.body;
        if( !name || !sex || !mobile || !address || !age){
            return res.status(400).json({message:"all fields are required"})
        }



        const newPatient=new Patient({patientID:newId,name,email,mobile,address,age,sex});
        await newPatient.save()

       
        res.json({message:"Patient created",data:newPatient})

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const createOp= async (req,res,next)=>{
    try {
        const lastOp= await Opdata.findOne().sort({ createdAt: -1 });
        const lastId=lastOp.op_Id
        const newId=lastId + 1
        // const newId=22334466
        
        const todayDate= new Date()
        const datePart = todayDate.toISOString().split('T')[0];
      
        const {name,patient,department,doctor,reception_bill}=req.body;

        const statusA="ACTIVE"

        
        if( !patient || !department || !doctor ){
            return res.status(400).json({message:"all fields are required"})
        }
       
        const newOp= new Opdata({op_Id:newId,date:datePart,name,patient,department,doctor,reception_bill,status:statusA});
        await newOp.save()
      
        
        const idNeed=newOp.id
       
        console.log(newOp);
        
        res.json({message:"Op created "})
        
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}


// export const addOPtoList= async (req,res,next)=>{
//     try {
        
        
//         const todayDate= Date()
       
//         const opdatafetch= await Opdata.findOne({newId});
//         const opObject=opdatafetch._id
//         const newList = await Oplist.findOneAndUpdate(
//             { date:todayDate },
//             { date:todayDate, op_Id:opObject },
//             { new: true, upsert: true }
//         );
//         res.json({message:"Op  added to todays list"})
//     } catch (error) {
//         return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
// }

export const getOpReception = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const opData = await Opdata.find({ patient: patientId }).sort({ createdAt: -1 }).populate("doctor"); 
       
        

        

        res.json({ message: "op reception-data fetched", data: opData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
export const getAppointmentReception = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const apData = await Appointment.find({ patient: patientId }).sort({ createdAt: -1 }).populate("doctor"); 
       
        

        

        res.json({ message: "Appointment reception-data fetched", data: apData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
export const getBookedAp= async (req, res, next) => {
    try {
        
        const apData = await Appointment.find({ status: ["Booked"] }).sort({ createdAt: -1 }).populate("doctor").populate("patient"); 
       
        res.json({ message: "Booked Appointment data fetched", data: apData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const getActiveOp= async (req, res, next) => {
    try {
        
        const opData = await Opdata.find({ status: "ACTIVE" }).sort({ createdAt: -1 }).populate("doctor").populate("patient"); 
       
        res.json({ message: "Active op data fetched", data: opData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

// export const findTodayOplist = async (req,res,next) =>{
//     const todayDate= new Date()
//         const datePart = todayDate.toISOString().split('T')[0];
        
        
//     try {
//         const opList = await Opdata.find({date:datePart});
// console.log(opList);

//         res.json({ message: "op-list fetched", data: opList });
//     } catch (error) {
//         res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
// };
