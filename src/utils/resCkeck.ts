import { ResError } from "../interfaces/res-error";
import { User } from "../interfaces/User";

export const isUser = (object: any): object is User => {
    return 'id' in object;
};
export const isError = (object: any): object is ResError => {
    return 'error' in object;
};
