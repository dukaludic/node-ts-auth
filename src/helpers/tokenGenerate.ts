import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_TTL = 60;
const REFRESH_TOKEN_TTL = 3600;

export function generateAccessToken(payload: { id: number, email: string }): string {
    console.log('INSIDE generateAccessToken=====', ACCESS_TOKEN_TTL)
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TOKEN_TTL })
}

export function generateRefreshToken(payload: { id: number, email: string }): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);
}
