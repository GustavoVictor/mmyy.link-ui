import ICard from "../card.type";
import RequestError from "./request-error.type";

export default interface IInfoUser extends RequestError {
    name: string;
    nickName: string;
    lastName: string;
    sumary: string;
    email: string;
    backgroundColor: string,
    backgroundImage: string,
    cards: Array<ICard>;
}