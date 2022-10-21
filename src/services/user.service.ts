import { UserAPI } from "../apis/user-api";
import ICreateUser from "../interfaces/user/create-user.type";
import IUser from "../interfaces/user/user.type";
import jwt_decode from 'jwt-decode';

export default class UserService {

    userInfo(): IUser | undefined {
        let token = localStorage.getItem("token");

        if (!token)
            return undefined;
        
        const parsedToken = JSON.parse(token);

        let _decodeJwt = jwt_decode(parsedToken);

        let decodeJwt:any;

        return {
            name: decodeJwt.name,
            nickName: decodeJwt.nickName,
            lastName: decodeJwt.lastName,
            sumary: decodeJwt.sumary,
            email: decodeJwt.email,
            backgroundColor: decodeJwt.backgroundColor ?? '#000',
            backgroundImage: decodeJwt.backgroundImage ?? '#000',
            cards: []
        }
    }

    async login(email: string, password: string)
    {
        
    }

    async create(user: ICreateUser): Promise<boolean> {
        let token:string | undefined = await UserAPI.create(user);
        
        if (token == undefined && !token)
            return true;

        this.storeToken(token);
        
        return true;
    }

    private async storeToken(token: string): Promise<void> {
        localStorage.setItem('token', JSON.stringify(token));
    } 
}