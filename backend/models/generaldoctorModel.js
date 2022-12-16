import mongoose from 'mongoose'
const generaldoctorSchema = mongoose.Schema(
    {
      person: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Person',
      },
    },
    {
      timestamps: true,
    }
  )
  