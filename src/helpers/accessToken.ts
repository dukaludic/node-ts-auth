import jwt from 'jsonwebtoken';

export function generateAccessToken({ email }: { email: string }) {
    return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET!)
}
