import { ResError } from "../interfaces/res-error";
import { User } from "../interfaces/User";
import { trycatch } from "../utils/tryCatch";
import { CHECK_EMAIL, CHECK_REGISTRATION, CHECK_USERNAME, CREATE_USER, GET_EMAILS, GET_USER, GET_USERS, GET_USER_BY_ID, GET_USER_REGISTERED_DEVICES, REGISTER_USER_DEVICE, UPDATE_PASSWORD, UPDATE_USER_REGISTERED_DEVICE } from "./consts";

export const getUsers = async () => await trycatch(GET_USERS, []);
export const createUser = async (userData: User) => await trycatch(CREATE_USER, [userData.id, userData.email, userData.username, userData.password]);
export const getUser = async (email: string, username: string): Promise<User | ResError> => await trycatch(GET_USER, [email, username], true);
export const getUserById = async (id?: string): Promise<User | ResError> => await trycatch(GET_USER_BY_ID, [id], true);
export const updateUserPassword = async (password: string, id?: string): Promise<any | ResError> => await trycatch(UPDATE_PASSWORD, [password, id]);
export const checkEmailTaken = async (email: string): Promise<any | ResError> => await trycatch(CHECK_EMAIL, [email], true);
export const checkUsernameTaken = async (username: string): Promise<any | ResError> => await trycatch(CHECK_USERNAME, [username], true);
export const registerUserDevice = async (userId: string, token: string): Promise<any | ResError> => await trycatch(REGISTER_USER_DEVICE, [userId, token]);
export const updateRegisteredUserDevice = async (userId: string, token: string): Promise<any | ResError> => await trycatch(UPDATE_USER_REGISTERED_DEVICE, [userId, token], true);
export const checkDeviceRegistered = async (userId: string, token: string): Promise<any | ResError> => await trycatch(CHECK_REGISTRATION, [token], true);
export const getUserRegisteredDevices = async (userId: string): Promise<any | ResError> => await trycatch(GET_USER_REGISTERED_DEVICES, [userId]);
export const getEmails = async (): Promise<any> => await trycatch(GET_EMAILS, []);
