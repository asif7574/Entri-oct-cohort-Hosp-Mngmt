const updateprofile = async (req, res) => {
    try {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const result = await User.findByIdAndUpdate(
        { _id: req.locals },
        { ...req.body, password: hashedPass }
      );
      if (!result) {
        return res.status(500).send("Unable to update user");
      }
      return res.status(201).send("User updated successfully");
    } catch (error) {
      res.status(500).send("Unable to update user");
    }
  };


  const bcrypt = require("bcrypt");

// Sample model (replace with your database logic)
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, mobile, address, password, department } = req.body;

    // Fetch user from database
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    // Update only changed fields
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (address) user.address = address;
    if (department) user.department = department;

    // Save updated user
    await user.save();

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
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
    if (mobile) employeeVal.mobile = mobile;
    if (address) employeeVal.address = address;
    if (role) employeeVal.department = role;

    await employeeVal.save();

        res.json({ message: "Profile Updated" });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};