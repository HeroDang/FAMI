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
    accountid: {
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
const Person = mongoose.model('persons', personSchema)

export default Person