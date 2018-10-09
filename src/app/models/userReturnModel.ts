export interface UserReturnModel {
    url: string,
    id: string,
    userName: string,
    email: string,
    emailConfirmed: boolean,
    roles: string[],
    claims: string[]
}
