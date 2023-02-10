export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface InsertUserRes extends Tokens {
    userId: number;
}