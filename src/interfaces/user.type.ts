import ICard from "./card.type";

export default interface IUser{
    name: string;
    nickName: string;
    lastName: string;
    sumary: string;
    email: string;
    backgroundColor: string,
    cards: Array<ICard>;
}