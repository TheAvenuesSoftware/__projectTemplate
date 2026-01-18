console.log("LOADED:- googleAPIs_ServerSide.mjs is loaded",new Date().toLocaleString());
export function googleAPIs_ServerSideMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const googleAPIsRouter = Router();
    import { trace, maskString } from "./global_Server.mjs";
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalServer.env`});
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

googleAPIsRouter.post('/get-google-places-api-key', (req, res) => {
// googleAPIsRouter.get('/get-google-places-api-key', (req, res) => {
    console.log(`✅🔑 ${trace()} ✅🔑 /get-google-places-api-key called ✅🔑`);
    console.log(`✅🔑 ${trace()} ✅🔑 /get-google-places-api-key called ✅🔑 ${maskString(process.env.GOOGLE_PLACES_API_KEY,15,10)}`);
    const isDEVmachine = process.env.APP_HOSTED_ON_DEVELOPMENT_MACHINE?.toLowerCase();
    let GOOGLE_KEY = '';
    if (isDEVmachine === 'true') {
        console.log(`✅🌐 ${trace()} ✅🌐 Server is running on DEVELOPMENT machine ✅🌐`);
        GOOGLE_KEY = process.env.GOOGLE_API_DEV_KEY;
    } else {
        console.log(`✅🌐 ${trace()} ✅🌐 Server is running on SERVER ✅🌐`);
        GOOGLE_KEY = process.env.GOOGLE_API_KEY;
    }
    // res.json({ success: true, apiKey: process.env.GOOGLE_PLACES_API_KEY });
    res.json({ success: true, apiKey: GOOGLE_KEY });
});

const isDEVmachine = process.env.APP_HOSTED_ON_DEVELOPMENT_MACHINE?.toLowerCase();
let GOOGLE_KEY = '';
if (isDEVmachine === 'true') {
    console.log(`✅🌐 ${trace()} ✅🌐 Server is running on DEVELOPMENT machine ✅🌐`);
    GOOGLE_KEY = process.env.GOOGLE_API_DEV_KEY;
} else {
    console.log(`✅🌐 ${trace()} ✅🌐 Server is running on SERVER ✅🌐`);
    GOOGLE_KEY = process.env.GOOGLE_API_KEY;
}
googleAPIsRouter.post("/point-to-point-tolls", async (req, res) => {
    console.log(`✅🛣️ ${trace()} ✅🛣️ /point-to-point-tolls called ✅🛣️`);
    console.log(`✅🛣️ ${trace()} ✅🛣️ /point-to-point-tolls called with query:`, req.body);
    const { origin, destination } = req.body;
    const url =
        "https://maps.googleapis.com/maps/api/directions/json?" +
        `origin=${encodeURIComponent(origin)}` +
        `&destination=${encodeURIComponent(destination)}` +
        `&departure_time=now&alternatives=true&key=${GOOGLE_KEY}`;
    console.log(url);
    const googleRes = await fetch(url);
    const data = await googleRes.json();
    console.log(data);
    res.json(data); // return result to browser
});

export default googleAPIsRouter;