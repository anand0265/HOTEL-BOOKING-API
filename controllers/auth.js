const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async(req,res)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save()
        res.status(200).send({
            success:true,
            message:"User Register Successfully",
            newUser
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Register Api"
        })
    }
}

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).send({
            success:false,
            message:"Provise email and password"
        })
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User Not Register' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        success:true,
        message:"User Login Successfully",
         token, 
         user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Admin Registration (Only One Admin Allowed)
const adminRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if an admin already exists
        const existingAdmin = await User.findOne({ isAdmin: true });

        if (existingAdmin) {
            return res.status(403).json({ message: "Admin registration is restricted. Only one admin is allowed." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the admin user
        const newAdmin = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin: true  // Ensure this is an admin account
        });

        await newAdmin.save();

        res.status(201).json({
            success: true,
            message: "Admin registered successfully.",
         
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during admin registration." });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin exists
        const admin = await User.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Verify admin role
        if (!admin.isAdmin) {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, isAdmin: admin.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            message: "Admin logged in successfully.",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during login." });
    }
};




module.exports = {register,login, adminRegister, adminLogin}