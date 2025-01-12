import e from "express";
import {  adminAuthorization, getAuthPending, sales } from "../controllers/adminController.js";
import { employeeAuth } from "../middlewares/employeeAuth.js";



const router= e.Router();



router.put('/authorize',employeeAuth(['admin']),adminAuthorization)
router.put('/profile-update')
router.delete('/delete-account')
router.get('/auth-pending',employeeAuth(['admin']),getAuthPending)
router.get('/sales-report',employeeAuth(['admin']),sales)

export {router as adminRouter}