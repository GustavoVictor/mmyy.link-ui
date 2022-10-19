import ICreateUser from "../interfaces/user/create-user.type";
import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"

export const UserAPI = {
    create: async function (user: ICreateUser, cancel:boolean = false){
        await api.request<string>({
            url:'/user',
            method: 'POST',
            data: user,
            signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined
        });
    }
}

const cancelApiObject = defineCancelApiObject(UserAPI);