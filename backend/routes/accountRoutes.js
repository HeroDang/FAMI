import express from 'express'
const router = express.Router()
import {getAccounts} from '../controllers/accountController.js'


router.route('/').get(getAccounts)


export default router