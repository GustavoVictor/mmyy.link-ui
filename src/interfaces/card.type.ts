export default interface ICard {
    id?: string | null,
    index: number,
    URL: string | undefined,
    description: string,
    is_a_group: boolean,
    in_group: string | undefined
}