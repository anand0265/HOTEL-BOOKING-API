const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { updatePasswordController, resetPasswordController, 
    updateUser,
    deleteUser,
    getUserById,
    getUser} = require('../controllers/user')
    
const  adminMiddleware  = require('../middleware/adminMiddleware')


const router = express.Router()

// Update Password
router.post('/update-password',authMiddleware, updatePasswordController)

// Reset Password
router.post('/reset-password',authMiddleware, resetPasswordController)



// Update User
router.put('/update/:id',authMiddleware,updateUser)
// Delete User
router.delete('/delete/:id',authMiddleware,deleteUser)
// Get User By Id
router.get('/get-id/:id',authMiddleware,getUserById)
// Get all User
router.get('/get-all',adminMiddleware,getUser)

module.exports = router