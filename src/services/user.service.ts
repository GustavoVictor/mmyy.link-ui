import { UserAPI } from "../apis/user-api";
import ICreateUser from "../interfaces/user/create-user.type";
import IUser from "../interfaces/user/user.type";
import jwt_decode from "jwt_decode";

export default class UserService {

    userInfo(): IUser | undefined {
        let token = localStorage.getItem("token");

        if (!token)
            return undefined;
        
        const parsedToken = JSON.parse(token);

        let decodeJwt = jwt_decode(parsedToken);

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

    create(user: ICreateUser){
        let token = UserAPI.create(user);
        
        localStorage.setItem('token', JSON.stringify(token));
    }
}