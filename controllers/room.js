const Room = require('../models/Room')
const Hotel = require('../models/Hotel')

// Create Room
const createRoom = async(req, res)=>{
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push : {rooms: savedRoom._id}})
            
        } catch (error) {
            console.log(error)
        }
        res.status(200).send({
            success:true,
            message:"create Room Sucessfully",
            savedRoom
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in create Room API"
        })
    }
}

// Update Room
const updateRoom = async(req,res)=>{
    try {
        const RoomId = req.params.id
    const newUpdate = req.body
    const updatedRoom = await Room.findByIdAndUpdate(RoomId,newUpdate,{ new: true })

    res.status(200).send({
        success:true,
        message:"Updated Room Successfully",
        updatedRoom
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update Room API"
        })
        
    }
    
}

// Delete Room
const deleteRoom = async(req,res)=>{
    const hotelId = req.params.hotelid
    try {
       // const RoomId = req.params.id
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {rooms: req.params.id}
            })
            
        } catch (error) {
            console.log(error)
        }
        res.status(200).send({
            success:true,
            message:"Room delete Successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Delete Room API"
        })
        
    }
}

// Get Room By ID
const getRoomById= async(req,res)=>{
    try {
        const RoomId = req.params.id
        const Room = await Room.findById(RoomId)
        res.status(200).send({
            success:true,
            message:"Room get Successfully",
            Room
        })
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:"Error in get Room By Id API"
        })
    }
}

// Get All
const getRoom = async(req,res)=>{
    try {
        const Room = await Room.find();
        res.status(200).send({
            success:false,
            message:"Get Room Successfully",
            Room
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in GET Room Api"
        })
    }
}

module.exports = {createRoom, updateRoom, deleteRoom,
    getRoomById, getRoom
}