import { Request, Response } from 'express';
import { checkEmailTaken, checkUsernameTaken, createUser, getUser, getUserById, getUsers, updateUserPassword } from "../db/user-db";
import { CustomRequest } from '../interfaces/custom-request';
import { checkToken } from '../middlewares/auth-middleware';
import { ResError } from "../interfaces/res-error";
import { User } from "../interfaces/User";
import { generateNewPassword, generateUser, validateUserPassword } from "../utils/userGenerator";
import { generateToken, validateToken } from "../utils/webTokenValidator";
import Express from 'express';
import { isError } from '../utils/resCkeck';


const express = require('express');
const router = new express.Router()

router.get('/user-data', checkToken, async (req: CustomRequest, res: Response) => {
    const { userId } = req;
    console.log(userId);
    const user = await getUserById(userId);
    setTimeout(() => {
        res.send(user);
    }, 2000);
});

router.post('/login', async (req: { body: User }, res: Response) => {
    const { password, username, email } = req.body;
    const user = await getUser(email, username);
    console.log(user);
    if (!user) return res.status(400).send({ message: 'No User' });
    if (isError(user)) return res.status(400).send({ message: 'Server error' });
    const validPwd = await validateUserPassword(password, user.password);
    if (!validPwd) return res.status(400).send({ message: 'Invalid credentials' });
    const token = generateToken(user.id);
    return res.send({ token })
});
router.post('/signup', async (req: { body: User }, res: Response) => {
    const { username, email } = req.body;
    const existingEmail = await checkEmailTaken(email);
    if (existingEmail.exist) return res.status(400).send({ message: 'E-Mail already taken' });
    const existingUsername = await checkUsernameTaken(username);
    if (existingUsername.exist) return res.status(400).send({ message: 'Username already taken' });
    const user = await generateUser(req.body);
    if (!user) return res.status(400).send({ message: 'No User' });
    if (isError(user)) return res.status(400).send({ message: 'Server error' });
    const inserted = await createUser(user);
    if (isError(inserted)) return res.status(400).send({ message: 'Server error' });
    const token = generateToken(user.id);
    return res.send({ token })
});

router.post('/validate-token', async (req: any, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(400).send({ message: 'No token provided' });
    const validToken = await validateToken(token);
    if (validToken.error) return res.status(400).send({ message: 'Invalid token' });
    return res.send({ valid: true });
});

router.post('/update-password', checkToken, async (req: CustomRequest, res: Express.Response) => {
    const { userId } = req;
    const { password } = req.body;
    const encrPwd = await generateNewPassword(password);
    if (encrPwd.password) return res.status(400).send({ message: encrPwd.error });
    const update = await updateUserPassword(encrPwd, userId);
    if (update.error) return res.status(400).send({ message: update.error });
    return res.send();
});




module.exports = router
