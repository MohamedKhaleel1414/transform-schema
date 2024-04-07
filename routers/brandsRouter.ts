import * as express from 'express'
const router = express.Router()
import { getBrands, seedData } from '../controllers/getData'

router.get('/getall', getBrands)
router.post('/seeddata', seedData)

export default router