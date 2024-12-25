import { Employee } from '../models/employeeModel.js';
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/token.js';


export const employeeSignup= async (req,res,next)=>{
    try {
        const lastEmId= await Employee.findOne().sort({ createdAt: -1 });
        const lastId=lastEmId.employeeID
        const newEmId=lastId + 1

        const {name,email,password,mobile,address,department,role,control_role,profiePic}=req.body;
        if( !name || !email || !password || !mobile){
            return res.status(400).json({message:"all fields are required"})
        }


        const employeeExist= await Employee.findOne({mobile});
        if(employeeExist){
            return res.status(400).json({message:"employee already exist"})
        }

        const hashedpassword=bcrypt.hashSync(password,10)
        console.log(password);
        console.log(hashedpassword);
        

        const newEmployee=new Employee({employeeID:newEmId,name,email,password:hashedpassword,mobile,address,department,role,control_role,profiePic});
        await newEmployee.save()

       
        res.json({message:"employee created",data:newEmployee})

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}


export const employeeLogin= async (req,res,next)=>{
    try {
        const {employeeID,password}=req.body;
        if(!employeeID || !password){
            return res.status(400).json({message:"all fields are required"})
        }
console.log(req.body);

        const employeeExist= await Employee.findOne({employeeID});
        if(!employeeExist){
            return res.status(400).json({message:"employee not exist"})
        }

        const issPasswordMatch= bcrypt.compareSync(password,employeeExist.password)

        if(!issPasswordMatch){
            return res.status(400).json({message:"employee not authenticated"})
        }

        if (!employeeExist.control_role) {
            return res.status(403).json({ message: 'Authorization pending. Contact admin.' });
          }

        const token = generateToken(employeeExist,employeeExist.control_role)
        console.log(token);
        console.log(employeeExist.control_role);

        res.cookie('token',token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });
        
        res.json({message:"employee logined"})

    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}



export const employeeProfile = async (req, res, next) => {
    try {
        
     const employeeid =req.employee.id;
     const employeeProfile = await Employee.findById(employeeid).select("-password");



        res.json({ message: "employee login successfully", data:employeeProfile });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



export const employeeLogout = async (req, res, next) => {
    try {
        
     res.clearCookie('token', {
        sameSite: "None",
        secure: true,
        httpOnly: true,
    });

        res.json({ message: "employee logout success" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const checkEmployee= async (req, res, next) => {
    try {
        

        res.json({ message: "user autherized" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};


export const updateEmployeeProfile= async (req, res, next) => {
    try {
        const { name,employeeID, email, mobile, address, password, role } = req.body;

       const employeeVal= await Employee.findOne({employeeID});
       
       if(!employeeVal){
        return res.status(400).json({message:"employee not exist"})
    }
    const isPasswordMatch= bcrypt.compareSync(password,employeeVal.password)
    if(!isPasswordMatch){
        return res.status(400).json({message:"Password is Wrong"})
    }

    if (name) employeeVal.name = name;
    if (email) employeeVal.email = email;
    if (mobile) employeeVal.mobile = mobile;
    if (address) employeeVal.address = address;
    if (role) employeeVal.department = role;

    await employeeVal.save();

        res.json({ message: "Profile Updated" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};





