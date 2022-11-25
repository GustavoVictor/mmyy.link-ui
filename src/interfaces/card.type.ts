export default interface ICard {
    id?: string | null,
    index: number,
    url: string | undefined,
    description: string,
    is_a_group: boolean,
    social: boolean,
    in_group: string | undefined
}