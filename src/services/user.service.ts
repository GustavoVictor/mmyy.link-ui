import { UserAPI } from "../apis/user-api";
import ICreateUser from "../interfaces/user/create-user.type";
import IInfoUser from "../interfaces/user/info-user.type";
import jwt_decode from 'jwt-decode';
import ILoggedUser from "../interfaces/user/logged-user.type";

export default class UserService {
    loggedUser(): ILoggedUser| undefined {
        let token = localStorage.getItem("token");

        if (!token)
            return undefined;
        
        const parsedToken = JSON.parse(token);

        let decodeJwt = jwt_decode<any>(parsedToken);

        return {
            id: decodeJwt.jti,
            email: decodeJwt.email,
            nick: decodeJwt.unique_name,
            firstName: decodeJwt.given_name,
            lastName: decodeJwt.family_name,
            expirationToken: decodeJwt.exp,
            roles: decodeJwt.roles as string[]
        }
    } 
    
    async userInfo(nick: string) : Promise<IInfoUser | undefined> {
        let user:IInfoUser | undefined = await UserAPI.userInfo(nick);
        
        if (user == undefined)
            return undefined;

        return user;
    }

    async login(email: string, password: string): Promise< ILoggedUser| undefined> {
        let token:string | undefined = await UserAPI.login({email: email, password: password});
        
        if (token == undefined && !token)
            return undefined;

        this.storeToken(token);
        
        return this.loggedUser();
    }

    async create(user: ICreateUser): Promise<boolean> {
        let token:string | undefined = await UserAPI.create(user);
        
        if (token == undefined && !token)
            return false;

        this.storeToken(token);
        
        return true;
    }

    private async storeToken(token: string): Promise<void> {
        localStorage.setItem('token', JSON.stringify(token));
    } 
}