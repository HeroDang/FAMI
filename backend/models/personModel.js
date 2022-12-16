import mongoose from 'mongoose'

const personSchema = mongoose.Schema(
    {
      ID: {
        type: String,
     
      },
      name: {
        type: String,
        
      },
      phone: {
        type: String,
        
      },
      address: {
        type: String,
     
      },
      accountID: {
        type: String,
        
      },
      day: {
        type: String,
        
      },
      job: {
        type: String,
        
      },
      sex: {
        type: String,
        
      },
      
    },
    {
      timestamps: true,
    }
  )
const Person = mongoose.model('Person', personSchema)

export default Person