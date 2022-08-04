var jwt = require('jsonwebtoken');

export const validateToken = (token: string) => {
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded
    }
    catch (error) {
        return { error: error }
    }
}

export const generateToken = (id?: string): string => {
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 30
    });
    return token
}