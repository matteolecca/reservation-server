var jwt = require('jsonwebtoken');

export const validateToken = (token: string) => {
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'spindoxsucks');
        return decoded
    }
    catch (error) {
        return { error: error }
    }
}

export const generateToken = (id?: string): string => {
    console.log("Generating token")
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET || 'spindoxsucks', {
        expiresIn: 1000 * 60 * 60 * 24 * 30
    });
    return token
}