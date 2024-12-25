import e from "express";
import { checkEmployee, employeeLogin, employeeLogout, employeeProfile, employeeSignup, updateEmployeeProfile } from "../controllers/employeeController.js";
import { employeeAuth } from "../middlewares/employeeAuth.js";


const router= e.Router();

router.post('/signup',employeeSignup)
router.post('/login',employeeLogin,)
router.get('/profile',employeeAuth(['staff','doctor','receptionist','nurse','pharmacist','admin']),employeeProfile)
router.put('/logout',employeeAuth(['staff','doctor','receptionist','nurse','pharmacist','admin']),employeeLogout)
router.put('/reset-password')
router.put('/profile-update',employeeAuth(['staff','doctor','receptionist','nurse','pharmacist','admin']),updateEmployeeProfile)
router.delete('/delete-account')
router.get('/check-employee',employeeAuth(['staff','doctor','receptionist','nurse','pharmacist','admin']) ,checkEmployee)

export {router as employeeRouter}