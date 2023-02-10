import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_TTL = 30;
const REFRESH_TOKEN_TTL = 3660;

export function generateAccessToken(payload: { id: number, email: string }): string {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: ACCESS_TOKEN_TTL })
}

export function generateRefreshToken(payload: { id: number, email: string }): string {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: REFRESH_TOKEN_TTL });
}
