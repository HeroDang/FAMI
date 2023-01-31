import mongoose from 'mongoose'

const billSchema = mongoose.Schema(
  {
    ID: {
      type: String,

    },
    drugid: {
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

const Bill = mongoose.model('bills', billSchema)

export default Bill