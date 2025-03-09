import tokenService from '../services/token-service'
import bcrypt from 'bcrypt'
import { UserDto } from '../dto/user-dto'
import 'dotenv/config'
import userModel from '../models/user-model'
import { ApiError } from '../exceptions/api-errors'



class UserService {

    async registration(email: string, login: string, password: string) {
        const candidate = await userModel.findOne({ email });
        if (candidate) {
       throw ApiError.BadRequest('Пользователь с таким email уже существует')
        }
        const candidateLogin = await userModel.findOne({ login });
        if (candidateLogin) {
            throw ApiError.BadRequest('Пользователь с таким логином уже существует')
        }
        if (!email || !login || !password) {
         throw ApiError.BadRequest('Некорректные данные')
        }
  
        const saltPass = await bcrypt.genSalt(8);
        const hashPass = await bcrypt.hash(password, saltPass);
    
        const user = await userModel.create({
            email,
            login,
            password: hashPass,
        });
    
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        await user.save()
    
        return { message: 'Всё прошло успешно', status: 200, ...tokens, user: userDto };
      }


      async login(email: string, password: string) {
        const user = await userModel.findOne({ email })
        if (!user) {
         throw ApiError.BadRequest('Пользователь не найден');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
          throw ApiError.BadRequest('Неверный пароль');
        }

        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { message: 'Всё прошло успешно', status: 200, ...tokens, user: userDto };
      }


      async checkAuth(refreshToken: string) {
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
    
        if (!userData || !tokenFromDb) return
    
        if (typeof userData === 'object' && userData !== null && 'id' in userData) {
          const user = await userModel.findById(userData.id);
          
          if (!user) return
      
          return { isAuth: true };
        }
      }
    }
export default new UserService()
