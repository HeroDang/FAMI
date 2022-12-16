import asyncHandler from 'express-async-handler'
import Account from '../models/accountModel.js'

const getAccount = asyncHandler(async (req, res) => {
    const account = await Account.find({})

    console.log(typeof account)
    res.json(account)
  })

  export {
    getAccount,
  }