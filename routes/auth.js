const express = require('express')
const { register, login, adminRegister, adminLogin } = require('../controllers/auth')

const router = express.Router()

// Register 
router.post('/register',register)
// Login 
router.post('/login',login)

// Admin Register
router.post('/admin/register',adminRegister)

// Admin Login
router.post('/admin/login',adminLogin)

module.exports = router