import e from "express";
import { createDrug, createPharmacyBill, getAllDrugs, getConsultedOp, getDrugDetails } from "../controllers/pharmacyController.js";
import { employeeAuth } from "../middlewares/employeeAuth.js";


const router = e.Router();

router.get("/get-all-drugs",employeeAuth(['pharmacist','admin']),getAllDrugs);
router.get("/get-consulted-op",employeeAuth(['pharmacist','admin']),getConsultedOp);
router.get("/get-drugDetails/:drugId",employeeAuth(['pharmacist','admin']),getDrugDetails);
router.post("/create-drug",employeeAuth(['pharmacist','admin']),createDrug);
router.post("/create-pharmacy-bill",employeeAuth(['pharmacist','admin']),createPharmacyBill);
router.put("/update-drug");
router.delete("/drug-delete");
router.get("/get-ladrug-drug");
router.get("/search-drugs");
router.post("/create-lab-ticket");

export { router as pharmacyRouter };