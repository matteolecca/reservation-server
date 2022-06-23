import { trycatch } from "../utils/tryCatch";
import { GET_SITES } from "./consts";

export const getSites = async () => await trycatch(GET_SITES, []);
