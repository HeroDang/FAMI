import asyncHandler from 'express-async-handler'
import Person from '../models/personModel.js'

const getPersons = asyncHandler(async (req, res) => {
    const person = await Person.find({})
    console.log(person)
    console.log("vao ne")
    res.json(person)
  })

  export {
    getPersons,
  }