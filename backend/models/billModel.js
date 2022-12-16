import mongoose from 'mongoose'

const billSchema = mongoose.Schema(
  {
    ID: {
      type: String,

    },
    drugID: {
      type: String,

    },
    count: {
      type: String,

    },
    cost: {
      type: String,

    },
    time: {
      type: String,

    },
    state: {
      type: String,

    },


  },
  {
    timestamps: true,
  }
)

const Bill = mongoose.model('Bill', billSchema)

export default Bill