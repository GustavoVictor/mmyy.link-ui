import ICard from "./card.type";

export default interface IUser{
    name: string;
    nickName: string;
    lastName: string;
    email: string;
    cards: Array<ICard>;
}