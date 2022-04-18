import { ResError } from "../interfaces/res-error";
import { User } from "../interfaces/User";

const db = require('../config/db-connect')

export const trycatch = async (query: any, params: any, deeper?: any): Promise<User | ResError> => {
    let result = null
    try {
        result = await db.query(query, params);
    }
    catch (error: any) {
        return ({ error: error.message })
    }
    if (deeper) return result[0][0]
    return result[0]
}
