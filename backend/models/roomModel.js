import mongoose from 'mongoose'

const roomSchema = mongoose.Schema(
    {
      ID: {
        type: String,
     
      },
      name: {
        type: String,
        
      },
    },
    {
      timestamps: true,
    }
  )