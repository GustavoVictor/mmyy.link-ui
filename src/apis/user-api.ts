import ICard from "../interfaces/card.type";
import ICreateUser from "../interfaces/user/create-user.type";
import IInfoUser from "../interfaces/user/info-user.type";
import ILoginUser from "../interfaces/user/login-user.type";
import RequestError from "../interfaces/user/request-error.type";
import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"

export const UserAPI = {
    userInfo: async function(nick: string, cancel:boolean = false): Promise<IInfoUser | undefined> {
        try{
            const ret = await api.request<IInfoUser>({
                url:`/user/${nick}`,
                method: 'GET',
                signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined
            });
            
            if (ret.data == null)
                return undefined;
            
            return ret.data;
        } catch(e: any){
            let ret = e.response.data as IInfoUser;
            ret.hasError = true;
            return ret;
        }
    },
    login: async function<T> (credentials: ILoginUser, cancel:boolean = false): Promise<string | RequestError | undefined> {
        try{
            const ret = await api.request<string | undefined>({
                url:'/user/authenticate',
                method: 'POST',
                data: credentials,
                signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined
            });

            if (ret.data == null)
                return undefined;

            return ret.data;
        } catch(e: any){
            let ret = { hasError: true, message: 'login error'};
            return ret;
        }
    },
    create: async function<T> (user: ICreateUser, cancel:boolean = false): Promise<T | undefined> {
        const ret = await api.request<T>({
            url:'/user',
            method: 'POST',
            data: user,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined
        });

        if (ret.data == null)
            return undefined;

        return ret.data;
    },
    updateSummary: async function (summary: string, cancel:boolean = false): Promise<boolean | RequestError | undefined> {
        try{
            return await api.request<boolean>({
                url: `/user/summary`,
                params : {
                    summary: summary
                },
                method: 'PUT',
                signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined
            });
        } catch(e: any){
            const error = e as RequestError;
            let ret = { hasError: true, message: error.message};
            return ret;
        }
    },
    addCard: async function (card: ICard, cancel:boolean = false): Promise<any | RequestError | undefined> {
        try{
            return await api.request<any>({
                url: `/user/cards`,
                method: 'POST',
                data: card,
                signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined
            });
        } catch(e: any){
            const error = e as RequestError;
            let ret = { hasError: true, message: error.message};
            return ret;
        }
    }
}

const cancelApiObject = defineCancelApiObject(UserAPI);