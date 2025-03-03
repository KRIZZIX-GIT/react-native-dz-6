import IErrorDetail from '../interfaces/IErrorDetail';

export class ApiError extends Error {
	status: number
	errors: IErrorDetail[]
  
	constructor(status: number, message: string, errors: IErrorDetail[] = []) {
	  super(message)
	  this.status = status
	  this.errors = errors
	  Object.setPrototypeOf(this, ApiError.prototype)
	}
  
	static BadRequest(message: string, errors: IErrorDetail[] = []) {
	  return new ApiError(400, message, errors);
	}
  
	static UnauthorizedError() {
		return new ApiError(401, 'Пользователь не авторизован')
	}
  }