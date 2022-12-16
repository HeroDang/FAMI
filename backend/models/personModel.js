import mongoose from 'mongoose'

const personSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,

    },
    address: {
      type: String,

    },
    accountID: {
      type: String,

    },
    day: {
      type: String,

    },
    job: {
      type: String,

    },
    gender: {
      type: String,

    },

  },
  {
    timestamps: true,
  }
)
const Person = mongoose.model('Person', personSchema)

export default Person