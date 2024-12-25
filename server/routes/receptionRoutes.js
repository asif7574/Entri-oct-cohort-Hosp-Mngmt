import e from "express";
import { employeeAuth } from "../middlewares/employeeAuth.js";
import { findAllOp, findAllPatients, getPatientDetails } from "../controllers/commonController.js";
import { createOp, createPatient, getActiveOp, getAppointmentReception, getBookedAp, getOpReception } from "../controllers/receptionController.js";



const router= e.Router();

router.get('/find-all-patients',findAllPatients);
router.get('/get-patient-details/:patientId',employeeAuth(['receptionist','doctor','admin']),getPatientDetails);

router.get('/find-all-op',employeeAuth(['receptionist','admin']),findAllOp);


router.post('/create-patient',employeeAuth(['receptionist','admin']),createPatient)
router.post('/create-op',employeeAuth(['receptionist','admin']),createOp)
router.get('/get-op-reception/:patientId',getOpReception)
router.get('/get-ap-reception/:patientId',getAppointmentReception)
router.get('/get-Booked-Ap',employeeAuth(['receptionist','doctor','admin']),getBookedAp)

router.get('/get-Active-Op',employeeAuth(['receptionist','doctor','admin']),getActiveOp)
router.put('/edit-patient')
router.delete('/delete-')
export {router as receptionRouter}