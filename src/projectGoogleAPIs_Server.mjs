const consoleLog = true;

console.log("LOADED:- googleAPIs_ServerSide.mjs is loaded",new Date().toLocaleString());
export function googleAPIs_ServerSideMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const googleAPIsRouter = Router();
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalServer.env`});
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

googleAPIsRouter.post('/google-places-api-key', (req, res) => {
// googleAPIsRouter.get('/google-places-api-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_PLACES_API_KEY });
});

export default googleAPIsRouter;