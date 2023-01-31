import express from 'express'
const router = express.Router()
import {getAccount} from '../controllers/accountController.js'


router.route('/').get(getAccount)


export default router