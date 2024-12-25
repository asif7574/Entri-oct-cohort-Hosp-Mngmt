import { Drug } from "../models/drugsModel.js";
import { Opdata } from "../models/opdataModel.js";
import { Pharmacy } from "../models/pharmacyModel.js";



export const createDrug = async (req, res, next) => {
    try {
        const { drug_name,brand_name,company,price} = req.body;


        if (!drug_name || !brand_name  || !company || !price ) {
            return res.status(400).json({ message: "all fields required" });
        }

        const drugData = new Drug({ drug_name,brand_name,company,price});
        await drugData.save();

        return res.json({ message: "drug created", data: drugData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const getAllDrugs = async (req,res,next) =>{
    try {
        const drugList = await Drug.find();

        res.json({ message: "drug-List fetched", data: drugList });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



export const getDrugDetails = async (req, res, next) => {
    try {
        const { drugId } = req.params;

        const drugData = await Drug.findById(drugId);

        res.json({ message: "drug data fetched", data: drugData });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const createPharmacyBill = async (req, res, next) => {
    try {
        const lastbill= await Pharmacy.findOne().sort({ createdAt: -1 });
        const lastBillNum=lastbill.bill_number
        const newBillNum=lastBillNum + 1
        // const newBillNum=66223311

        const employeeId = req.employee.id; 

        const {medicines,op_number,total_amount } = req.body;

        const newBill= new Pharmacy({bill_number:newBillNum,op_number,medicines,total_amount,pharmacist:employeeId});
        await newBill.save()

        const pharmacybill = await Opdata.findOneAndUpdate(
            { op_Id:op_number },
            { pharmacy_bill:total_amount },
            {new:true}
        );
        console.log(newBill);
        
console.log(pharmacybill);

       

        res.json({ message: "bill created", data: newBill });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


