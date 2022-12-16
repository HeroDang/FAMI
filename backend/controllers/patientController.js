import asyncHandler from 'express-async-handler'
import Patient from '../models/patientModel.js'

const getPatients = asyncHandler(async (req, res) => {
    const patient = await Patient.find({})
    console.log(patient)
    res.json(patient)
  })

  export {
    getPatients,
  }