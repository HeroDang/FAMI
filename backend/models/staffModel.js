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
  const Staff = mongoose.model('Room', staffSchema)

export default Staff
  