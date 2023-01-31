import mongoose from 'mongoose'

const meformSchema = mongoose.Schema(
  {
    form: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Form',
    },

    roomid: {
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

const MeForm = mongoose.model('meforms', meformSchema)

export default MeForm


