import mongoose from 'mongoose'

const salebookSchema = mongoose.Schema(
    {
      ID: {
        type: String,
      },
      time:{
        type: String,
      }
     
      
    },
    {
      timestamps: true,
    }
  )