import express from 'express'
const router = express.Router()
import {getPatients} from '../controllers/patientController.js'


router.route('/').get(getPatients)


export default router