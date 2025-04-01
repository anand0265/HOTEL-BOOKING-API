const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const User = require('../models/User')

// RESET PASSWORD
const resetPasswordController=async(req,res)=>{
try {
    const {email,newPassword} = req.body;
    if(!email || !newPassword ){
        return res.status(500).send({
            success:false,
            message:"Please Provide All fields"
        })
    }
    
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(500).send({
           success:false,
           message:"User Not Found or Invalid answer"
        })
    }

    
             // Hash password before saving
             const salt = await bcrypt.genSalt(10);
             const hashedPassword = await bcrypt.hash(newPassword, salt);
             user.password=hashedPassword;
             await user.save()
             res.status(200).send({
                success:true,
                message:"Password reset successfully"
             })
    
} catch (error) {
    console.log(error)
res.status(500).send({
    success:false,
    message:"Error in Reset Pasword API",
    error
})    
}
}


// Update Password
const updatePasswordController=async(req,res)=>{
try {
    const user= await userModel.findById({_id:req.body.id})
    if(!user){
        return res.status(500).send({
            success:false,
            message:"User Not Found"
        })
    }
    //get data from user
    const {OldPassword, newPassword}=req.body
    if(!OldPassword || !newPassword){
       return res.status(500).send({
        success:false,
        message:"Provide OldPassword and newPassword"
       })
    }
    
     // Check if password is correct
            const isMatch = await bcrypt.compare(OldPassword, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    success: false,
                    message: "Invalid OldPassword",
                });
            }
           
            // Hash password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password=hashedPassword;
            await user.save()
            res.status(200).send({
               success:true,
               message:"Password Update Successfully"
            })

} catch (error) {
    console.log(error)
   res.status(500).send({
    success:false,
    message:"Error in Update Password API",
    error
   })
}
}




// Update User
const updateUser = async(req,res)=>{
    try {
        const UserId = req.params.id
    const newUpdate = req.body
    const updatedUser = await User.findByIdAndUpdate(UserId,newUpdate,{ new: true })

    res.status(200).send({
        success:true,
        message:"Updated User Successfully"
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update User API"
        })
        
    }
    
}

// Delete User
const deleteUser = async(req,res)=>{
    try {
        const UserId = req.params.id
        await User.findByIdAndDelete(UserId)
        res.status(200).send({
            success:true,
            message:"User delete Successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Delete User API"
        })
        
    }
}

// Get User By ID
const getUserById= async(req,res)=>{
    try {
        const UserId = req.params.id
        const User = await User.findById(UserId)
        res.status(200).send({
            success:true,
            message:"User get Successfully",
            User
        })
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:"Error in get User By Id API"
        })
    }
}

// Get All
const getUser = async(req,res)=>{
    try {
        const User = await User.find();
        res.status(200).send({
            success:false,
            message:"Get User Successfully",
            User
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in GET User Api"
        })
    }
}

module.exports = {resetPasswordController, updatePasswordController,
    updateUser, deleteUser,
    getUserById, getUser
}
