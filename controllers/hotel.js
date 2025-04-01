const Hotel = require('../models/Hotel')

// Create Hotel
const createHotel=async(req,res)=>{
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).send({
            success:true,
            message:"Hotel created successfully",
            savedHotel
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in create Hotel API"
        })
    }
}

// Update Hotel
const updateHotel = async(req,res)=>{
    try {
        const HotelId = req.params.id
    const newUpdate = req.body
    const updatedHotel = await Hotel.findByIdAndUpdate(HotelId,newUpdate,{ new: true })

    res.status(200).send({
        success:true,
        message:"Updated hotel Successfully"
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update Hotel API"
        })
        
    }
    
}

// Delete Hotel
const deleteHotel = async(req,res)=>{
    try {
        const HotelId = req.params.id
        await Hotel.findByIdAndDelete(HotelId)
        res.status(200).send({
            success:true,
            message:"Hotel delete Successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Delete Hotel API"
        })
        
    }
}

// Get Hotel By ID
const getHotelById= async(req,res)=>{
    try {
        const HotelId = req.params.id
        const hotel = await Hotel.findById(HotelId)
        res.status(200).send({
            success:true,
            message:"Hotel get Successfully",
            hotel
        })
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:"Error in get Hotel By Id API"
        })
    }
}

// Get All
const getHotel = async(req,res)=>{
    try {
        const hotel = await Hotel.find();
        res.status(200).send({
            success:false,
            message:"Get Hotel Successfully",
            hotel
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in GET Hotel Api"
        })
    }
}

// Count City
const countByCity = async(req,res)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
          return Hotel.countDocuments({city:city})
        }))
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in count City API"
        })
    }
}

// Count Type
const countByType= async(req,res)=>{
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type : "apartment"})
        const resortCount = await Hotel.countDocuments({type : "resort"})
        const villaCount = Hotel.countDocuments({type : "villa"})
        const cabinCount = Hotel.countDocuments({type : "cabin"})

        res.status(200).send([
            {type:"hotel", count:hotelCount},
            {type : "apartment", count :apartmentCount},
            {type : "resort", count: resortCount},
            {type : "villa", count: villaCount},
            {type : "cabin", count:cabinCount},


        ])
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in count By Type API"
        })
    }
}

module.exports = {createHotel, updateHotel,deleteHotel,
    getHotelById, getHotel,
    countByCity, countByType
}