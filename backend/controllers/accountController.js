import asyncHandler from 'express-async-handler'
import Account from '../models/accountModel.js'

const getAccounts = asyncHandler(async (req, res) => {
    const account = await Account.find({})
    console.log(account)
    res.json(account)
  })

  export {
    getAccounts,
  }