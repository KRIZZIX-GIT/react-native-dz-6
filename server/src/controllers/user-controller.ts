import { Request, Response, NextFunction } from 'express';
import userService from '../services/user-service';
import { ApiError } from '../exceptions/api-errors';

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
		try {
            const {email, login, password} = req.body
			if (!email || !login || !password) {
			throw ApiError.BadRequest('Некорректные данные')
			}
			const resp = await userService.registration(email, login, password)
			
			res.json(resp)
		} catch (err) {
			next(err)
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const {email, password} = req.body
			if (!email || !password) {
			 throw ApiError.BadRequest('Некорректные данные')
			}
			const resp = await userService.login(email, password)

			res.json(resp)
		} catch (err) {
			next(err)
		}
	}
}
export default new UserController()