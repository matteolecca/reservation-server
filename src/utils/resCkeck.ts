import { ResError } from "../interfaces/res-error";
import { User } from "../interfaces/User";

export const isUser = (object: any): object is User => {
    if(typeof object === "object"){
        return "id" in object;
    }
    return false;
};
export const isError = (object: any): object is ResError => {
    if(typeof object === "object"){
        return "error" in object;
    }
    return false;
};
