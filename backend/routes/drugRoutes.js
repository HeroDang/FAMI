import express from 'express'
const router = express.Router()
import {getDrugs} from '../controllers/drugController.js'


router.route('/').get(getDrugs)


export default router