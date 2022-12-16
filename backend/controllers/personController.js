import asyncHandler from 'express-async-handler'
import Person from '../models/personModel.js'

const getPersons = asyncHandler(async (req, res) => {
    const person = await Person.find({})
    console.log(person)
    res.json(person)
  })

  export {
    getPersons,
  }