import mongoose from 'mongoose'
const staffSchema = mongoose.Schema(
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
  