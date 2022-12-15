import mongoose from 'mongoose'

const drugSchema = mongoose.Schema(
    {
      ID: {
        type: String,
     
      },
      name: {
        type: String,
        
      },
      type: {
        type: String,
        
      },
      count: {
        type: String,
     
      },
      price: {
        type: String,
        
      },
      unit: {
        type: String,
        
      },
      producer: {
        type: String,
        
      },
      
    },
    {
      timestamps: true,
    }
  )