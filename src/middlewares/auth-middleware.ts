import { NextFunction, Response } from "express";
import { isError } from "../utils/resCkeck";
import { validateToken } from "../utils/webTokenValidator";
interface JwtPatload {
    id: string;
}
export const checkToken = async (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).send({ error: "No token" });
    const result = validateToken(authorization) as JwtPatload;
    if(isError(result)){
        return res.status(400).send({ error: "No token" });
    }
    req.userId = result.id;
    // req.userId = id;
    next();
};
