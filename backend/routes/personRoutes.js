import express from 'express'
const router = express.Router()
import {getPersons} from '../controllers/personController.js'


router.route('/').get(getPersons)


export default router