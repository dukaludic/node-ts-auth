export interface RequestExt extends Request {
    user?: {
        email: string,
        password: string,
        iat: number
    }
}