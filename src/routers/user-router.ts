import { Request, Response } from "express";
import { checkEmailTaken, createUser, getUser, getUserById, updateUserPassword } from "../db/user-db";
import { CustomRequest } from "../interfaces/custom-request";
import { checkToken } from "../middlewares/auth-middleware";
import { User } from "../interfaces/User";
import { generateNewPassword, generateUser, validateUserPassword } from "../utils/userGenerator";
import { generateToken, validateToken } from "../utils/webTokenValidator";
import Express from "express";
import { isError } from "../utils/resCkeck";


const router = Express.Router();

router.get("/user-data", checkToken, async (req: CustomRequest, res: Response) => {
    const { userId } = req;
    const user = await getUserById(userId);
    res.send(user);
});

router.post("/login", async (req: { body: User }, res: Response) => {
    const { password, username, email } = req.body;
    const user = await getUser(email, username);
    if (!user) return res.status(401).send({ message: "No User" });
    if (isError(user)) return res.status(500).send({ message: "Server error" });
    const validPwd = await validateUserPassword(password, user.password);
    if (!validPwd) return res.status(401).send({ message: "Invalid credentials" });
    const token = generateToken(user.id);
    return res.send({ token });
});
router.post("/signup", async (req: { body: User }, res: Response) => {
    const { email } = req.body;
    const existingEmail = await checkEmailTaken(email);
    if (isError(existingEmail)) return res.status(500).send({ message: "Server error" });
    if (existingEmail.exist) return res.status(401).send({ message: "E-Mail already taken" });
    const user = await generateUser(req.body);
    if (!user) return res.status(401).send({ message: "No User" });
    if (isError(user)) return res.status(500).send({ message: "Server error" });
    const inserted = await createUser(user);
    if (isError(inserted)) return res.status(500).send({ message: "Server error" });
    const token = generateToken(user.id);
    return res.send({ token });
});

router.post("/validate-token", async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).send({ message: "No token provided" });
    const validToken = validateToken(token);
    if(isError(validToken))return res.status(401).send({ message: "Invalid token" });
    return res.send({ valid: true });
});

router.post("/update-password", checkToken, async (req: CustomRequest, res: Response) => {
    const { userId } = req;
    const { password } = req.body;
    const encrPwd = await generateNewPassword(password);
    if (isError(encrPwd)) return res.status(400).send({ message: encrPwd.error });
    const update = await updateUserPassword(encrPwd, userId);
    if (update.error) return res.status(500).send({ message: update.error });
    return res.send();
});

export default router;
