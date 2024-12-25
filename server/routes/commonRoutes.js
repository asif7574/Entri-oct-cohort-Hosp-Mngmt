import e from "express";
import { bookAppointment, getAppointmentById, getDoctor, getOpDetails, ReceptionOpDetailUpdate, updateAppointmentStatus } from "../controllers/commonController.js";
import { employeeAuth } from "../middlewares/employeeAuth.js";




const router= e.Router();

router.get('/get-op-details/:opId',employeeAuth(['receptionist','doctor','admin','pharmacist']),getOpDetails);
router.get('/active-op')
router.get('/search-doctor',employeeAuth(['receptionist','doctor','admin']),getDoctor)
router.post('/book-appointment',employeeAuth(['receptionist','doctor','admin']),bookAppointment)
router.get('/ap-details/:id',employeeAuth(['receptionist','doctor','admin']), getAppointmentById);
router.put('/ap-update/:id',employeeAuth(['receptionist','doctor','admin']), updateAppointmentStatus);
router.put('/update-Op/:opId',employeeAuth(['receptionist','doctor','admin','pharmacist']),ReceptionOpDetailUpdate)
router.delete('/delete-account')
router.get('/check-employee')

export {router as commonRouter}