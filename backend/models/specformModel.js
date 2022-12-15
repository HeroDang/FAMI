import mongoose from 'mongoose'

const speformSchema = mongoose.Schema(
    {
        Form: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Form',
          },
        
      roomID: {
        type: String,
      },
      require: {
        type: String,
        
      },
      result: {
        type: String,
      },
      attresult: {
        type: String,
        
      },
    },
    {
      timestamps: true,
    }
  )


