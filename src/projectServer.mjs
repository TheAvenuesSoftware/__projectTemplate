const consoleLog = true

if(consoleLog===true){console.log(trace(),"LOADED:- projectRouter.mjs is loaded",new Date().toLocaleString());}
export function projectRoutesMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const projectRouter = Router();
    // // CORS handling START
    //     import cors from 'cors';
    //     projectRouter.use(cors());
    //     // fixes LOCAL CORS [start]
    //         projectRouter.use((req, res, next) => {
    //             res.header('Access-Control-Allow-Origin', '*'); // Adjust the '*' to your specific domain
    //             res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //             res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //             next();
    //         });    
    //     // fixes LOCAL CORS [end]
    // // CORS handling END
    import {trace} from "./globalServer.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

export function postLoginActions(req,res){
    const dbPromise_Alice = initDB(req.body.userEmailAddress); // each user gets their own DB

}

projectRouter.post('/validate_date', (req,res) => {
    if(consoleLog===true){console.log(trace());}
    if(consoleLog===true){console.log('req.body:- ',req.body);}
    const date = new Date(req.body.date);
    if(consoleLog===true){console.log('new Date(req.body.date):- ',date);}
    let today = new Date().toLocaleDateString();
    today = new Date(new Date());
    if(consoleLog===true){console.log('today:- ',today);}
    if(date > today){
        res.send({message:"A future date is not valid, please try again.",status:false})
    }
    // const dateMinus366
    if(date < today){
        res.send({message:"Date is valid.",status:true});
    }
});

    // Endpoint to get data from database
        projectRouter.get("/getExpenses", (req, res) => {
            if(consoleLog===true){console.log(trace());}
            if(consoleLog===true){console.log("app.get('/getExpenses', async (req, res)");}
            db.all("SELECT * FROM expenses", [], (err, rows) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(rows);
                }
            });
        });

    // Endpoint to get data from database
        projectRouter.post('/getAllExpenses', async (req, res) => {
            if(consoleLog===true){console.log(trace());}
            if(consoleLog===true){console.log("app.get('/getAllExpenses', async (req, res)");}
            try {
                if(consoleLog===true){console.log(trace());}
                if(consoleLog===true){console.log(req.body);}
                // Step 1: Fetch data from an external source (mocked for simplicity)
                    const externalData = [
                        { id: 1, item: 'Groceries', amount: 50 },
                        { id: 2, item: 'Rent', amount: 1200 },
                        { id: 3, item: 'Utilities', amount: 150 },
                    ];

                // Step 2: Validate or enrich the data
                    const validatedData = externalData.map(expense => {
                        if (!expense.item || expense.amount <= 0) {
                            throw new Error(`Invalid expense data: ${JSON.stringify(expense)}`);
                        }
                        return {
                            ...expense,
                            timestamp: new Date().toISOString() // Add a timestamp
                        };
                    });

                // Step 3: Send the processed data to the client
                    res.status(200).json(validatedData);

            } catch (error) {
                if(consoleLog===true){console.log(trace());}
                console.error('🔴 Error:', error.message);
                res.status(500).json({ error: 'Failed to process expenses' });
            }
        });

export default projectRouter;