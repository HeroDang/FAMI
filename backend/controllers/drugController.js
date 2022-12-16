import asyncHandler from 'express-async-handler'
import Drug from '../models/drugModel.js'

const getDrugs = asyncHandler(async (req, res) => {
    const drug = await Drug.find({})
    console.log(drug)
    res.json(drug)
  })

  export {
    getDrugs,
  }