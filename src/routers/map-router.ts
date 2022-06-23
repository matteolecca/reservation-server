import { getSites } from '../db/sites-db';
import { CustomRequest } from '../interfaces/custom-request';
import { checkToken } from '../middlewares/auth-middleware';
import { isError } from '../utils/resCkeck';
const express = require('express');
const router = new express.Router()
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
var axios = require('axios');

router.get('/', async (req: CustomRequest, res: any) => {
    const { lat, lng } = req.query;
    // const lat = 45.45195489595769;
    // const lng = 9.117338696049964;
    console.log(lat, lng);
    const clat = 39.246668976914606;
    const clng = 8.966475966812073
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat || clat}%2C${lng || clng}&radius=100000&keyword=spindox&key=${process.env.GOOGLE_API_KEY}`,
        headers: {}
    };

    try {
        const { data } = await axios(config);
        console.log(data);
        res.send(data.results[0]);
    } catch (error) {
    }
});

router.get('/sites', async (req: CustomRequest, res: any) => {
    const sites = await getSites();
    if (isError(sites)) return res.status(400).send({ message: 'Server error' });
    res.send(sites);
});
module.exports = router

