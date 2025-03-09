import { Router } from 'express'
import userController  from '../controllers/user-controller'

const router = Router()


router.post('/registration', userController.registration) 
router.post('/login', userController.login)
router.post('/checkAuth', userController.checkAuth)

export default router
