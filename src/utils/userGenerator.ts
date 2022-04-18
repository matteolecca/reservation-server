const bcrypt = require("bcrypt");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
import { User } from '../interfaces/User';
import { ResError } from '../interfaces/res-error';
export const generateUser = async (userdata: User): Promise<User | ResError> => {
  if (!validator.isEmail(userdata.email)) {
    return { error: "invalid email" };
  }
  if (userdata.password.length < 1) {
    return { error: "password too short" };
  }
  const user = {
    ...userdata,
    password: await bcrypt.hash(userdata.password, 8),
    id: uuidv4(),
  };
  return user;
};

export const generateNewPassword = async (password: string) => {
  try {
    const newPassword = await bcrypt.hash(password, 8);
    return newPassword;
  } catch (error) {
    return { error: "Invalid password" };
  }
};

export const validateUserPassword = async (password: string, userPassword: string) => (
  await bcrypt.compare(password, userPassword)
);


