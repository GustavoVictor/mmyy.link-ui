import ICard from "../card.type";
import RequestError from "./request-error.type";

export default interface IInfoUser extends RequestError {
    name: string;
    nickName: string;
    lastName: string;
    summary: string;
    email: string;
    backgroundColor: string | undefined,
    backgroundImage: string | undefined,
    cards: Array<ICard>;
}