const express = require('express')
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const app = express()
dotenv.config();

app.use(express.json())
// Database connection
connectDb();

// Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/hotels',require('./routes/hotels'))
app.use('/api/rooms',require('./routes/rooms'))
app.use('/api/users',require('./routes/users'))

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
console.log(`Server running Port ${PORT}`)
})