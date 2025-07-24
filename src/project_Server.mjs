const consoleLog = true

console.log("LOADED:- projectServer.mjs is loaded",new Date().toLocaleString());
export function projectRoutesMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const projectRouter = Router();
    import { trace } from "./global_Server.mjs";
    import { initDB, getDB, setupSchema, insertUser } from "./projectSQLite_Server.mjs"
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

export async function postLoginActions_serverSide(req,res){
    const dbPromise = await initDB(req.body.userEmailAddress); // each user gets their own DB
    const db = await getDB(req.body.userEmailAddress);
    const dbSchema = 

        // `CREATE TABLE IF NOT EXISTS users (
        //     id INTEGER PRIMARY KEY AUTOINCREMENT,
        //     active TEXT,
        //     name TEXT NOT NULL,
        //     email TEXT NOT NULL UNIQUE,
        //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        // );
        // CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`
    
        // `CREATE TABLE users (
        //         id INTEGER PRIMARY KEY AUTOINCREMENT,
        //         active TEXT,
        //         name TEXT NOT NULL,
        //         email TEXT NOT NULL UNIQUE,
        //         signedIn INTEGER CHECK(signedIn IN (0, 1)) DEFAULT 0,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
        //     CREATE INDEX idx_users_email ON users(email);`

        `CREATE TABLE photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image BLOB,
            address TEXT,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX idx_photos ON photos(address);`

    await setupSchema(req.body.userEmailAddress,dbSchema);
    // await insertUser(req.body.userEmailAddress,db,req.body.userName,req.body.userEmailAddress);
}

export async function postLogoutActions_serverSide(req,res){
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

// // Endpoint to get data from database
//     projectRouter.get("/getExpenses", (req, res) => {
//         if(consoleLog===true){console.log(trace());}
//         if(consoleLog===true){console.log("app.get('/getExpenses', async (req, res)");}
//         db.all("SELECT * FROM expenses", [], (err, rows) => {
//             if (err) {
//                 res.status(500).send(err.message);
//             } else {
//                 res.json(rows);
//             }
//         });
//     });

// // Endpoint to get data from database
//     projectRouter.post('/getAllExpenses', async (req, res) => {
//         if(consoleLog===true){console.log(trace());}
//         if(consoleLog===true){console.log("app.get('/getAllExpenses', async (req, res)");}
//         try {
//             if(consoleLog===true){console.log(trace());}
//             if(consoleLog===true){console.log(req.body);}
//             // Step 1: Fetch data from an external source (mocked for simplicity)
//                 const externalData = [
//                     { id: 1, item: 'Groceries', amount: 50 },
//                     { id: 2, item: 'Rent', amount: 1200 },
//                     { id: 3, item: 'Utilities', amount: 150 },
//                 ];
// 
//             // Step 2: Validate or enrich the data
//                 const validatedData = externalData.map(expense => {
//                     if (!expense.item || expense.amount <= 0) {
//                         throw new Error(`Invalid expense data: ${JSON.stringify(expense)}`);
//                     }
//                     return {
//                         ...expense,
//                         timestamp: new Date().toISOString() // Add a timestamp
//                     };
//                 });
// 
//             // Step 3: Send the processed data to the client
//                 res.status(200).json(validatedData);
// 
//         } catch (error) {
//             if(consoleLog===true){console.log(trace());}
//             console.error('🔴 Error:', error.message);
//             res.status(500).json({ error: 'Failed to process expenses' });
//         }
//     });

export default projectRouter;