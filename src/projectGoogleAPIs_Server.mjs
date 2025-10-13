console.log("LOADED:- googleAPIs_ServerSide.mjs is loaded",new Date().toLocaleString());
export function googleAPIs_ServerSideMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const googleAPIsRouter = Router();
    import { trace } from "./global_Server.mjs";
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalServer.env`});
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

googleAPIsRouter.post('/get-google-places-api-key', (req, res) => {
// googleAPIsRouter.get('/get-google-places-api-key', (req, res) => {
    console.log(`✅🔑 ${trace()} ✅🔑 /get-google-places-api-key called ✅🔑`);
    res.json({ success: true, apiKey: process.env.GOOGLE_PLACES_API_KEY });
});

export default googleAPIsRouter;