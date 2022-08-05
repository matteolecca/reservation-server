import { Booking } from "../interfaces/booking";
import { ResError } from "../interfaces/res-error";
import { User } from "../interfaces/User";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../config/db-connect");

export const trycatch = async (query: string, params: any[], deeper?: boolean): Promise<any> => {
    let result = null;
    try {
        result = await db.query(query, params);
    }
    catch (error: any) {
        return ({ error: error.message });
    }
    if (deeper) return result[0][0];
    return result[0];
};
