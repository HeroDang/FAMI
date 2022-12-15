import mongoose from 'mongoose'

const pharmacistSchema = mongoose.Schema(
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
