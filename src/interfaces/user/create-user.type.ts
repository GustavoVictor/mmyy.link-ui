export default interface ICreateUser {
    nickName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Array<string>;
}