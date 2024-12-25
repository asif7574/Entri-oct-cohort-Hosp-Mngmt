import e from "express";
import {  adminAuthorization, getAuthPending } from "../controllers/adminController.js";
import { employeeAuth } from "../middlewares/employeeAuth.js";



const router= e.Router();



router.put('/authorize',employeeAuth(['admin']),adminAuthorization)
router.put('/profile-update')
router.delete('/delete-account')
router.get('/auth-pending',employeeAuth(['admin']),getAuthPending)

export {router as adminRouter}