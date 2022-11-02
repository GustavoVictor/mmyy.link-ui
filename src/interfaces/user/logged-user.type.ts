export default interface ILoggedUser {
    id: string;
    email: string;
    nick: string;
    firstName: string;
    lastName: string;
    expirationToken: number;
    roles: string[];
}