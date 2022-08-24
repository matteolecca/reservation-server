import jwt from "jsonwebtoken";
const tokenSecret = process.env.TOKEN_SECRET;

export const validateToken = (token: string) => {
    if(!tokenSecret){
        return { error: "No secret" };
    }
    try {
        return jwt.verify(token, tokenSecret);
    }
    catch (error) {
        return { error: error };
    }
};

export const generateToken = (id?: string): string | {error: string} => {
    if(!tokenSecret){
        return { error: "No secret" };
    }
    const token = jwt.sign({ id }, tokenSecret, {
        expiresIn: 1000 * 60 * 60 * 24 * 30
    });
    return token;
};