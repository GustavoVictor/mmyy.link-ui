import IGroup from "./group.type";
import IItem from "./item.type";

export default interface ICard extends IItem, IGroup {
    id?: string | null,
    index: number
}