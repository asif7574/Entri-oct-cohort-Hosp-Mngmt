import { Appointment } from "../models/appointmentModel.js";
import { Employee } from "../models/employeeModel.js";
import { Opdata } from "../models/opdataModel.js";

import { Patient } from "../models/patientModel.js";

export const findAllPatients = async (req,res,next) =>{
    try {
        const patientList = await Patient.find();

        res.json({ message: "patient-list fetched", data: patientList });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const getPatientDetails = async (req, res, next) => {
    try {
        const { patientId } = req.params;

        const patientData = await Patient.findById(patientId);

        res.json({ message: "patient data fetched", data: patientData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const findAllOp = async (req,res,next) =>{
    try {
        const patientList = await Opdata.find();

        res.json({ message: "op-list fetched", data: patientList });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const findTodayOplist = async (req,res,next) =>{
    const todayDate= new Date()
        const datePart = todayDate.toISOString().split('T')[0];
        
        
    try {
        const opList = await Opdata.find({date:datePart});
console.log(opList);

        res.json({ message: "op-list fetched", data: opList });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const getOpDetails = async (req, res, next) => {
    try {
        const { opId } = req.params;

        const opData = await Opdata.findById(opId).populate("doctor").populate("patient");

        res.json({ message: "op-data fetched", data: opData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const getDoctor = async (req, res, next) => {
    try {
        
        const doctors = await Employee.find({ control_role: 'doctor' }, 'name _id'); 

   

        res.json({ message: "doctor-data fetched", data: doctors });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



export const bookAppointment = async (req, res, next) => {
    try {
       
        
        const todayDate= new Date()
        const datePart = todayDate.toISOString().split('T')[0];
      
        const {name,patient,department,doctor,time}=req.body;

        const statusW="Waitig for Approval"
        if( !patient || !department || !doctor ){
            return res.status(400).json({message:"all fields are required"})
        }
       
        const newAp= new Appointment({date:datePart,name,patient,department,doctor,status:statusW,time});
        await newAp.save()
      
        
        
        
        res.json({message:"Appointment Booked Successfully",data: newAp })
        
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const getAppointmentById = async (req, res) => {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findById(id).populate('patient').populate('doctor');
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.status(200).json({message:"appointment fetched",data:appointment});
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
  };

  export const updateAppointmentStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(req.body);
      
  
      const appointment = await Appointment.findByIdAndUpdate(
        id,
        { status:status },
        // { new: true }
      );
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.status(200).json({message:"appointment updated",data:appointment});
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

//   export const getOpDetails = async (req, res, next) => {
//     try {
//         const { patientId } = req.params;
//         const opData = await Opdata.find({ patient: patientId }).sort({ createdAt: -1 }).populate("doctor"); 
       
        

        

//         res.json({ message: "op reception-data fetched", data: opData });
//     } catch (error) {
//         res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
// };

export const ReceptionOpDetailUpdate= async (req,res,next)=>{
    try {
        const { opId } = req.params;
        
        const {status,total_bill}=req.body;
console.log(req.body);

        if (!status || !total_bill) {
            return res.status(404).json({ message: 'Require all fields' });
          }
      
        const updatedRecord = await Opdata.findOneAndUpdate(
            { _id: opId }, // Find by ID
            { status,total_bill }, // Update fields
             // Return the updated document
        );
        
        
        
        
        res.json({message:"Op prescribed ",data:updatedRecord})
        
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}