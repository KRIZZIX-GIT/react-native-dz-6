import { Router } from 'express'
import userController  from '../controllers/user-controller'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})
router.post('/registration', userController.registration) 
router.post('/login', userController.login)

export default router
