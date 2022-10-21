import ICreateUser from "../interfaces/user/create-user.type";
import ILoginUser from "../interfaces/user/login-user.type";
import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"

export const UserAPI = {
    login: async function<T> (credentials: ILoginUser, cancel:boolean = false): Promise<T | undefined> {
        const ret = await api.request<T>({
            url:'/user',
            method: 'POST',
            data: credentials,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined
        });

        if (ret.data == null)
            return undefined;

        return ret.data;
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
    }
}

const cancelApiObject = defineCancelApiObject(UserAPI);