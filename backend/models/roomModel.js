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
const Room = mongoose.model('rooms', roomSchema)

export default Room