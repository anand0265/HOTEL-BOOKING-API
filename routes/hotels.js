const express = require('express')
const { createHotel, updateHotel, deleteHotel, getHotelById, getHotel, countByCity, countByType } = require('../controllers/hotel')

const adminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router()

// Create Hotel
router.post('/create',adminMiddleware,createHotel)
// Update Hotel
router.put('/update/:id',adminMiddleware,updateHotel)
// Delete Hotel
router.delete('/delete/:id',adminMiddleware,deleteHotel)
// Get Hotel By Id
router.get('/get-id/:id', getHotelById)
// Get all Hotel
router.get('/get-all', getHotel)

// count city
router.get('/countByCity',countByCity)
router.get('/countByType',countByType)

module.exports = router