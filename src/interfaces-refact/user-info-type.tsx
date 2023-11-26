import ICardSocialMediaType from "./card-social-media-type";
import ICardType from "./card-type";

export default interface IUserInfo {
    name: string;
    nickName: string;
    lastName: string;
    summary: string;
    email: string;
    backgroundColor: string | undefined;
    backgroundImage: string | undefined;
    cardsSocialMedia: Array<ICardSocialMediaType>;
    cards: Array<ICardType>;
}