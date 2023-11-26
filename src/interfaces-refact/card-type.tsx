export default interface ICardType {
    id: string,
    index: number,
    url: string,
    description: string,
    type?: 'normal' | 'line'
}