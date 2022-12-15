import mongoose from 'mongoose'

const accountSchema = mongoose.Schema(
    {
      ID: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      
    },
    {
      timestamps: true,
    }
  )
  