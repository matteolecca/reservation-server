import { getSites } from "../db/sites-db";
import { CustomRequest } from "../interfaces/custom-request";
import { isError } from "../utils/resCkeck";
import express, { Response } from "express";
const router = express.Router();
import axios from "axios";

router.get("/", async (req: CustomRequest, res: Response) => {
    const { lat, lng } = req.query;
    const clat = 44.5288752;
    const clng = 10.8607579;
    const config = {
        method: "get",
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat || clat}%2C${lng || clng}&radius=100000&keyword=spindox&key=${process.env.GOOGLE_API_KEY}`,
        headers: {}
    };
    try {
        const { data } = await axios(config);
        const { place_id } = data.results[0];
        const { data: { result: { url, vicinity, name } } } = await axios({
            method: "get",
            url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${process.env.GOOGLE_API_KEY}`,
            headers: {}
        });
        res.send({ url, vicinity, name });
    // eslint-disable-next-line no-empty
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.get("/sites", async (_req: CustomRequest, res: Response) => {
    const sites = await getSites();
    if (isError(sites)) return res.status(500).send({ message: "Server error" });
    res.send(sites);
});
export default router;

