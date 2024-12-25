import e from "express";

import { employeeAuth } from "../middlewares/employeeAuth.js";
import { findAllOp, findAllPatients, getOpDetails, getPatientDetails } from "../controllers/commonController.js";
import { getDocOp, getWaitingAp, prescribeOp } from "../controllers/doctorController.js";


const router= e.Router();


// router.get('/find-all-patients',employeeAuth(['doctor']),findAllPatients);
router.get('/find-all-patients',findAllPatients);
router.get('/get-patient-details/:patientId',getPatientDetails);
router.get('/find-all-op',findAllOp);
router.get('/get-op-details/:patientId',getOpDetails);
router.get('/get-Wait-Ap',employeeAuth(['staff','doctor','receptionist','nurse','pharmacist','admin']),getWaitingAp)
router.get('/get-Doc-Op',employeeAuth(['staff','doctor','receptionist','nurse','pharmacist','admin']),getDocOp)
router.put('/prescribe-Op/:opId',employeeAuth(['doctor']),prescribeOp)
router.post('/check-patient/:patientId');




export {router as doctorRouter}