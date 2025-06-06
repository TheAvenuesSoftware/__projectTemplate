const consoleLog = true;

if(consoleLog===true){console.log("LOADED:- SQLite_ServerSide.mjs is loaded",new Date().toLocaleString());}
export function SQLite_ServerSideMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const dbRouter = Router();
    import sqlite3 from "sqlite3";
    import { open } from "sqlite";
    import { trace } from "./globalServer.mjs";
    import { isValidJSONString } from "./globalClient.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

            // 1. Initialize SQLite database based on a user's unique identifier: email address for example.
                export async function initDB(dbFileName) {
                    try {
                        return open({
                            filename: `./db/${dbFileName}.db`, // Stores user databases in a dedicated folder
                            driver: sqlite3.Database,
                        });
                    } catch (error) {
                            if(consoleLog===true){console.error(`${trace()} Error initializing database for ${dbFileName}:`, error);}       
                            throw error; // Ensure the error is propagated
                    }
                }
                // Example usage
                    // const dbPromise_Alice = initDB("alice123"); // Alice gets her own DB
                    // const dbPromise_Bob = initDB("bob456"); // Bob gets his own DB
                // ✅ Ensures one connection is shared across the app
                // ✅ Improves performance by reducing redundant connections
                // ✅ Each user gets an isolated database
                // ✅ Stored in a /databases/ directory to keep things organized

            // 2. Instead of creating a new connection each time a user interacts with the app, maintain a connection pool in memory.
                const dbInstances = new Map(); // Keeps track of initialized databases
                export async function getDB(dbFileName) {
                    if (!dbInstances.has(dbFileName)) {
                        dbInstances.set(dbFileName, await initDB(dbFileName));
                    }
                    return dbInstances.get(dbFileName);
                }
                // // Example usage
                //     const dbAlice = await getDB("alice123");
                //     const dbBob = await getDB("bob456");
                // ✅ Prevents redundant reinitialization
                // ✅ Speeds up access to databases already opened
            // Ensure your schema is properly structured with indexing for performance:
                export async function setupSchema(dbFileName,dbSchema) {
                    if(consoleLog===true){console.log(trace(),'Setup schema for ',dbFileName);}
                    const db = await getDB(dbFileName);
                    try{
                        await db.exec(dbSchema);
                        if(consoleLog===true){console.log(trace(),'Setup schema successful for ',dbFileName);}
                    } catch (error){
                        if(consoleLog===true){console.log(trace(),dbFileName,error);}
                    }
                }
                // ✅ Indexes speed up queries
                // ✅ Ensures schema persists across restarts
                const dbSchema = 
                    `CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        active TEXT,
                        name TEXT NOT NULL,
                        email TEXT NOT NULL UNIQUE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`
                // setupSchema("alice123",dbSchema);
                // setupSchema("bob456",dbSchema);
            // 3. Secure User Database Access
                // Each user should only be able to access their own database:
                // - Set strict file permissions (chmod 600 to restrict access).
                // - Consider encrypting the databases using SQLCipher if storing sensitive data.
                // Secure the Database
                    // For production, consider:
                    // - File Permissions: Restrict access to the SQLite file (chmod 600 database.sqlite).
                    // - Encryption: Use SQLCipher for encrypted storage if dealing with sensitive data.
                    // - Safe Queries: Always use parameterized queries to prevent SQL injection.
                    // Example (Safe Query Execution):
                        // async function insertUser(name, email) {
                        //     const db = await dbPromise;
                        //     await db.run('INSERT INTO users (name, email) VALUES (?, ?)', name, email);
                        // }
                        // centralise error handling function
                            export function handleDBError(err, action, database) {
                                if (err.code === 'SQLITE_CONSTRAINT') {
                                    if(consoleLog===true){console.error(`${trace()} Constraint error during ${action} on database ${database}.db`);}
                                } else {
                                    if(consoleLog===true){console.error(`${trace()} Database error during ${action} ${database}:`, err);}
                                }
                            }
                        // CRUD - insert
                            export async function insertUser(dbFileName, name, email) {
                                const db = await getDB(dbFileName);
                                try {
                                    // await db.run('INSERT INTO users (name, email) VALUES (?, ?)', name, email);
                                    await db.run('INSERT INTO users (name, email) VALUES (?, ?)', name, email);
                                    if(consoleLog===true){console.log(`${trace()} User added!`);}
                                } catch (err) {
                                    // localised error handling
                                        // if (err.code === 'SQLITE_CONSTRAINT') {
                                        //     console.error('Constraint error: Email must be unique',err);
                                        // } else {
                                        //     console.error('Insert error:', err);
                                        // }
                                    // centralised error handling
                                        handleDBError(err, 'insert', dbFileName);
                                }
                            }
                            // insertUser("alice123","Donald","donald.garton@outlook.com");
                            // insertUser("bob456","Donald","donald.garton@outlook.com");
                // Optimize for Performance
                    // 📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚📚
                    export async function optPer(dbFileName){
                        const db = await getDB(dbFileName);
                        try{
                            // For production, optimize SQLite:
                            // 1.1 - Enable WAL Mode (Write-Ahead Logging)
                            // 1.2- Enable WAL mode for concurrent reads and writes:
                                await db.exec('PRAGMA journal_mode = WAL;');
                                const mode = await db.get('PRAGMA journal_mode;');
                                console.log(trace(),"📗📚 Current journal mode:", mode);
                            // 2 - Increase Connection Cache
                                await db.exec('PRAGMA cache_size = 10000;'); // 10,000 = about 40Mb
                                    // ✅ Boosts concurrent writes & read speed
                                    // ✅ Reduces write-lock contention
                            // // 3 - Use indexes for frequently queried data:
                            //     await db.exec('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');
                            // Suggested Enhancements:
                                // - Memory Optimization for Large Queries:
                                    await db.exec('PRAGMA temp_store = MEMORY;');
                                    // - ✅ Ensures temporary data is stored in RAM instead of disk, making queries faster.
                                // - Optimize synchronous Mode for Balanced Performance & Durability:
                                    await db.exec('PRAGMA synchronous = NORMAL;');
                                    // - ✅ Allows slightly faster writes while maintaining safety in case of power failure.
                                    // 🚀 Default (FULL) is safest but may slow down high-frequency writes.
                                // // - Preload Frequently Used Data for Faster Access:
                                //     async function preloadData(dbFileName) {
                                //     const db = await getDB(dbFileName);
                                //         await db.all('SELECT * FROM users WHERE active = 1'); // Commonly accessed data
                                //     }
                                //     preloadData("alice123");
                                //     // - ✅ Ensures frequently queried records are cached in memory, reducing execution time.
                        }catch (error){
                            if(consoleLog===true){console.log(`${trace()}📕📚 `,error);}
                        }
                    }
                    // optPer("alice123");


// Here’s a complete set of generic CRUD functions:
    // 1. Create (Insert)
        export async function insertRecord(dbFileName, table, columns, values) {
            try {
                const db = await getDB(dbFileName);
                const placeholders = columns.map(() => '?').join(', ');
                const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
                await db.exec("BEGIN TRANSACTION");
                // Insert record
                    const result = await db.run(query, values);
                // Fetch last inserted row ID
                    const row = await db.get("SELECT last_insert_rowid() AS id");
                    await db.exec("COMMIT");
                    console.log(`Inserted record with rowID: ${row.id}`);
                    return row.id;
            } catch (err) {
                console.error(`Transaction failed for ${table}:`, err);
                await db.exec("ROLLBACK"); // Undo changes if error occurs
                throw err;
            }
        }

    // 2. Read (Select)
        export async function getRecord(dbFileName, table, condition = '', values = []) {
            const db = await getDB(dbFileName);
            try {
                const query = condition ? `SELECT * FROM ${table} WHERE ${condition}` : `SELECT * FROM ${table}`;
                // return await db.all(query, values);
                const selectedRecords = await db.all(query, values);
                return selectedRecords;
            } catch (err) {
                if(consoleLog===true){console.error(`${trace()} Select error in ${table}:`, err);}
                return [];
            }
        }
    // 3. Update (Modify)
        export async function updateRecord(dbFileName, table, updates, condition, values) {
            const db = await getDB(dbFileName);
            try {
                const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
                const query = `UPDATE ${table} SET ${setClause} WHERE ${condition}`;
                await db.run(query, [...Object.values(updates), ...values]);
            } catch (err) {
                if(consoleLog===true){console.error(`${trace()} Update error in ${table}:`, err);}
            }
        }
    // 4. Delete (Remove)
        export async function deleteRecord(dbFileName, table, condition, values) {
            const db = await getDB(dbFileName);
            try {
                const query = `DELETE FROM ${table} WHERE ${condition}`;
                await db.run(query, values);
            } catch (err) {
                if(consoleLog===true){console.error(`${trace()} Delete error in ${table}:`, err);}
            }
        }
// Usage
    // Insert a user
        // insertRecord("alice123", "users", ["name", "email"], ["Alice", "alice@example.com"]);
    // Fetch users
        // getRecord("alice123", "users")
        // .then(()=>{
        //     if(consoleLog===true){console.log(`${trace()}`);}
        // });
    // Update user email
        // updateRecord("alice123", "users", { email: "alice@newmail.com" }, "name = ?", ["Alice"]);
    // // Delete a user
    //     deleteRecord("alice123", "users", "name = ?", ["Alice"]);
// Why This Approach Is Effective?
    // ✅ Reusable → Works for any table in your database.
    // ✅ Parameterized Queries → Prevents SQL injection.
    // ✅ Scalable → Adaptable for different conditions and fields.
    // ✅ Simplifies CRUD logic → No duplicate code across tables.

// 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸
// Endpoint to save a photo
    dbRouter.post("/save-photo", async (req, res) => {
        console.log(`${trace()} req.body:- `,req.body);
        console.log(`${trace()} req.body.userEmailAddress:- ${req.body.userEmailAddress}`);

        const { image, address, notes } = req.body;
        const buffer = Buffer.from(image, "base64");
        // const query = `INSERT INTO photos (image, address, notes) VALUES (${image}, ${address}, ${notes})`;
        const query = "INSERT INTO photos (image, address, notes) VALUES (?, ?, ?)";
        console.log(trace(),query);
        const db = await getDB(`${req.body.userEmailAddress}`);
        console.log(trace(),"Connected Database:", db);
        await db.run(query, [buffer, address, notes])
        .then(() => {
            res.json({ message: "Photo saved successfully!" });
        })
        .catch((err) => {
            if(consoleLog===true){console.error(`${trace()} Error saving photo:`, err);}
            res.status(500).json({ message: "Failed to save photo." });
        });

    });

// Endpoint to get all photos
    dbRouter.post("/get-all-photos", async (req, res) => {
        const db = await getDB(`${req.body.userEmailAddress}`);
        db.get("SELECT image, address, notes FROM photos WHERE id = *", [req.params.id], (err, row) => {
            if (err || !row) {
                res.status(404).json({ message: "Photo not found." });
            } else {
                res.json({
                    image: `data:image/png;base64,${row.image.toString("base64")}`,
                    address: row.address,
                    notes: row.notes
                });
            }
        });
    });
// 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸
    
export default dbRouter;