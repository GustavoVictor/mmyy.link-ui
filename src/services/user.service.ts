import { UserAPI } from "../apis/user-api";
import ICreateUser from "../interfaces/user/create-user.type";
import IInfoUser from "../interfaces/user/info-user.type";
import jwt_decode from 'jwt-decode';
import ILoggedUser from "../interfaces/user/logged-user.type";
import RequestError from "../interfaces/user/request-error.type";
import ICard from "../interfaces/card.type";

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
        const ret = await UserAPI.login({email: email, password: password});
        
        if(!(ret as RequestError).hasError)
        {
            let token:string | undefined = ret as string;

            if (token == undefined && !token)
                return undefined;

            this.storeToken(token);
            
            return this.loggedUser();
        }
        else {
            console.log((ret as RequestError).message);
        }
    }

    async create(user: ICreateUser): Promise<boolean> {
        let token:string | undefined = await UserAPI.create(user);
        
        if (token == undefined && !token)
            return false;

        this.storeToken(token);
        
        return true;
    }

    async updateSummary(summary: string): Promise<boolean> {
        const ret = await UserAPI.updateSummary(summary);

        if (ret as RequestError){
            console.log(ret)
            return false;
        }

        return true;
    }

    async addCard(card: ICard): Promise<any | RequestError | undefined> {
        const ret = await UserAPI.addCard(card);

        if (ret as RequestError){
            console.log(ret)
            return false;
        }

        return true;
    }

    private async storeToken(token: string): Promise<void> {
        localStorage.setItem('token', JSON.stringify(token));
    } 
}