import Express from 'express';
import { validateToken } from '../utils/webTokenValidator';

export const checkToken = async (req: Express.Request, res: any, next: any) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).send({ error: 'No token' });
    const { id } = await validateToken(authorization);
    // @ts-ignore
    req.userId = id;
    next();
}
