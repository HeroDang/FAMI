import asyncHandler from 'express-async-handler'
import Room from '../models/roomModel.js'

const getRooms = asyncHandler(async (req, res) => {
    const room= await Room.find({})
    console.log(room)
    res.json(room)
  })

  export {
    getRooms,
  }