import IUser from '../interfaces/user-interface';


export class UserDto {
  email: string;
  login: string;
  password: string;
  id: string;
  

  constructor(model: IUser) { 
    this.email = model.email;
    this.login = model.login;
    this.password = model.password;
    this.id = model._id.toString()
   
  }
}
