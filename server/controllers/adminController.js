
import { Employee } from "../models/employeeModel.js";
import { Opdata } from "../models/opdataModel.js";

//no front end for admin signup
// export const adminSignup= async (req,res,next)=>{
//     try {
//         const {adminID,name,password,role}=req.body;
//         if(!adminID || !name || !password){
//             return res.status(400).json({message:"all fields are required"})
//         }
// console.log(req.body);

//         const adminExist= await Admin.findOne({adminID});
//         if(adminExist){
//             return res.status(400).json({message:"admin already exist"})
//         }

//         const hashedpassword=bcrypt.hashSync(password,10)
//         console.log(password);
//         console.log(hashedpassword);
        
        

//         const newAdmin=new Admin({adminID,name,password:hashedpassword,role});
//         await newAdmin.save()

        
//         res.json({message:"admin created"})

//     } catch (error) {
//         return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
// };



// export const adminLogin= async (req,res,next)=>{
//     try {
//         const {adminID,password}=req.body;
//         if(!adminID || !password){
//             return res.status(400).json({message:"all fields are required"})
//         }
// console.log(req.body);

//         const adminExist= await Admin.findOne({adminID});
//         if(!adminExist){
//             return res.status(400).json({message:"admin not exist"})
//         }

//         const issPasswordMatch= bcrypt.compareSync(password,adminExist.password)

//         if(!issPasswordMatch){
//             return res.status(400).json({message:"admin not authenticated"})
//         }

//         const token = generateToken(adminExist,'admin')
//         console.log(token);

//         res.cookie('token',token);
        
//         res.json({message:"admin authenticated"})

//     } catch (error) {
//         return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
// };



export const adminAuthorization= async (req,res,next)=>{
    try {
        const {employeeID,role}=req.body;
        if(!employeeID || !role){
            return res.status(400).json({message:"all fields are required"})
        }
        if (!['doctor', 'nurse', 'receptionist', 'ot_staff','lab_technician','pharmacist','admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
          }
console.log(req.body);

        const employeeExist= await Employee.findOne({employeeID});
        if(!employeeExist){
            return res.status(400).json({message:"employee not exist"})
        }
        employeeExist.control_role = role;
        await employeeExist.save();

        res.json({message:"employee Authorized"})

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const getAuthPending= async (req, res, next) => {
    try {
        // console.log(req.employee);
        
        
        
        const Data = await Employee.find({ control_role: null})
       
        
        res.json({ message: "Waiting for auth data", data: Data });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const sales= async (req, res, next) => {
    try {
        const startOfMonth = new Date(new Date().setDate(1));
        const endOfMonth = new Date(new Date().setMonth(new Date().getMonth() + 1, 0));
     console.log("startOfMonth===",startOfMonth);
     console.log("endOfMonth===",endOfMonth);
     

        const salesReport = await Opdata.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfMonth, $lte: endOfMonth }
                }
            },
            {
                $group: {
                    _id: null,
                    totalReceptionBill: { $sum: "$reception_bill" },
                    totalPharmacyBill: { $sum: "$pharmacy_bill" },
                    totalBill: { $sum: "$total_bill" }
                }
            }
        ]);

        // res.json(salesReport);
        
        res.json({ message: "Waiting for auth data", data: salesReport });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


// export const addDepartment= async (req,res,next)=>{
//     try {
//         const {name, head, doctors, nurses, staffs}=req.body;
//         if(!name){
//             return res.status(400).json({message:"all fields are required"})
//         }


//         const deptExist= await Dept.findOne({name});
//         if(deptExist){
//             return res.status(400).json({message:"Department already exist"})
//         }
       
        
//         const newAdmin=new Dept({name,head,doctors,nurses,staffs});
//         await newAdmin.save()

        
//         res.json({message:"Department created"})

//     } catch (error) {
//         return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
// };