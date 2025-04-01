const express = require('express')
const adminMiddleware = require('../middleware/adminMiddleware')
const { createRoom, updateRoom, deleteRoom, getRoomById, getRoom } = require('../controllers/room')



const router = express.Router()

// Create Room
router.post('/create/:hotelid',adminMiddleware, createRoom)
// Update Room
router.put('/update/:id',adminMiddleware, updateRoom)
// Delete Room
router.delete('/delete/:id/hotelid:',adminMiddleware, deleteRoom)
// Get Room By Id
router.get('/get-id/:id', getRoomById)
// Get all Room
router.get('/get-all',getRoom )

module.exports = router