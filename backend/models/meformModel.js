import mongoose from 'mongoose'

const meformSchema = mongoose.Schema(
  {
    Form: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Form',
    },

    roomID: {
      type: Array,
    },
    numorder: {
      type: String,

    },
  },
  {
    timestamps: true,
  }
)

const MeForm = mongoose.model('Meform', meformSchema)

export default MeForm


