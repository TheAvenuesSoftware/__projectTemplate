console.log("LOADED:- projectSQLite_Server.mjs is loaded",new Date().toLocaleString());

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const SQLiteRouter = Router();
    import sqlite3 from "sqlite3";
    import { open } from "sqlite";
    import { trace, maskString, dataFilePathName } from "./global_Server.mjs";
    import busboy from 'busboy';
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

            // 1. Initialize SQLite database based on a user's unique identifier: email address for example.
                async function initDB(dbFileName) {
                    try {
                        console.log(`${trace()}🟢 🗃️🗃️🗃️ Initialising database\n${dbFileName}\n${new Date().toISOString()} 🟢 🗃️🗃️🗃️`);
                        // const dataFile = dataFilePathName(dbFileName);
                        return open({
                            // filename: `${dataFile.filePath}${dataFile.fileName}`, // Use env variable
                            filename: dbFileName, // Use env variable
                            driver: sqlite3.Database,
                        });
                    } catch (error) {
                            console.log(`🔴${trace()}🔴 Error initializing database for ${dbFileName}🔴:`, error); 
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
                    console.log(trace(),'dbInstances:-\n',dbInstances,`\n as at:- [${new Date().toLocaleString()}]`);
                    return dbInstances.get(dbFileName);
                }
                // // Example usage
                //     const dbAlice = await getDB("alice123");
                //     const dbBob = await getDB("bob456");
                // ✅ Prevents redundant reinitialization
                // ✅ Speeds up access to databases already opened

                // Ensure your schema is properly structured with indexing for performance:
                export async function setupSchema(dbFileName,dbSchema) {
                    console.log(trace(),'Setup schema for ',dbFileName);
                    const db = await getDB(dbFileName);
                    try{
                        await db.exec(dbSchema);
                        console.log(trace(),'Setup schema successful for ',dbFileName);
                    } catch (error){
                        console.log(trace(),dbFileName,error);
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
                                    console.error(`${trace()} Constraint error during ${action} on database ${database}.db`);
                                } else {
                                    console.error(`${trace()} Database error during ${action} ${database}:`, err);
                                }
                            }
                        // CRUD - insert
                            export async function insertUser(dbFileName, name, email) {
                                const db = await getDB(dbFileName);
                                try {
                                    // await db.run('INSERT INTO users (name, email) VALUES (?, ?)', name, email);
                                    await db.run('INSERT INTO users (name, email) VALUES (?, ?)', name, email);
                                    console.log(`${trace()} User added!`);
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
                            // 1.2 - Enable WAL mode for concurrent reads and writes:
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
                            console.log(`${trace()}📕📚 `,error);
                        }
                    }
                    // optPer("alice123");

// (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:)
// Here’s a complete set of generic CRUD functions START:
// ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️ ⬇️
        // 1. Create (Insert)
            export async function updateUsersLogins(dbFileName, table, columns, values) {
                // console.log(trace(),"\n",`${process.env.APP_PATH_TO_DATA}${dbFileName}`,"\n", table,"\n", columns,"\n", values);
                console.log(trace(),"\n",dbFileName,"\n", table,"\n", columns,"\n", values);
                // const dataFile = dataFilePathName(emailAddress)
                try {
                    // const db = await getDB(dbFileName);
                    const db = await getDB(dbFileName);
                    console.log(trace(),`${dbFileName} is now `,db)
                    const placeholders = columns.map(() => '?').join(', ');
                    const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
                    console.log(trace(),"QUERY:-",query,` on DB:-`, db);
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
            export async function insertFormDataRecord(dbFileName, table, columns, values) {
            }
            export async function insertDataRecord(dbFileName, table, columns, values) {
                console.log(trace(),"\n",dbFileName,"\n", table,"\n", columns,"\n", values);
                // const dataFile = dataFilePathName(emailAddress)
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
                console.log(trace(),`getRecord() called on:-\ndbFileName ${dbFileName},\ntable ${table},\ncondition ${condition},\nvalues ${values}`)
                const dataFile = dataFilePathName(dbFileName);
                const filePath = dataFile.filePath;
                const fileName = dataFile.fileName;
                const dbFileName2 = `${filePath}${fileName}`;
                const db = await getDB(dbFileName2);
                try {
                    const query = condition ? `SELECT * FROM ${table} WHERE ${condition}` : `SELECT * FROM ${table}`;
                    // return await db.all(query, values);
                    const selectedRecords = await db.all(query, values);
                    return selectedRecords;
                } catch (err) {
                    console.error(`${trace()} Select error in ${table}:`, err);
                    return [];
                }
            }
        // // 3. Update (Modify)
        //     export async function updateRecord(dbFileName, table, updates, condition, values) {
        //         const db = await getDB(dbFileName);
        //         try {
        //             const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        //             const query = `UPDATE ${table} SET ${setClause} WHERE ${condition}`;
        //             await db.run(query, [...Object.values(updates), ...values]);
        //         } catch (err) {
        //             console.error(`${trace()} Update error in ${table}:`, err);}
        //         }
        //     }
        // 4. Delete (Remove)
            export async function deleteRecord(dbFileName, table, condition, values) {
                const db = await getDB(dbFileName);
                try {
                    const query = `DELETE FROM ${table} WHERE ${condition}`;
                    await db.run(query, values);
                } catch (err) {
                    console.error(`${trace()} Delete error in ${table}:`, err);
                }
            }
        // Usage
            // Insert a user
                // insertFormDataRecord("alice123", "users", ["name", "email"], ["Alice", "alice@example.com"]);
            // Fetch users
                // getRecord("alice123", "users")
                // .then(()=>{
                //     console.log(`${trace()}`);
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

// ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️ ⬆️
// Here’s a complete set of generic CRUD functions END:
// (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:) (:💡SQL:)


// Endpoint to save a photo record START
    // 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸
        // ADD NEW RECORD start
            SQLiteRouter.post("/insert-form-data-record", async (req, res) => {

                let responseSent = false;
                const safeRespond = (status, body) => {
                    if (!responseSent && !res.headersSent) {
                        res.status(status).json(body);
                        responseSent = true;
                    }
                };
                req.setTimeout(30000, () => {
                    console.error(trace(), '⏳ Request timed out');
                    safeRespond(408, { error: 'Request timeout' });
                });

                console.log(trace(),'Received request with Content-Type:', req.headers['content-type']);
                // const bb = busboy({ headers: req.headers });
                const bb = busboy({ headers: req.headers, defParamCharset: 'utf8' });
                const formData = {};

                // Handle file upload (image_blob)
                    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
                        const buffers = [];
                        file.on('data', (data) => buffers.push(data));
                        file.on('end', () => {
                            // // if uploading a file:-
                            //     formData[fieldname] = {
                            //         buffer: Buffer.concat(buffers),
                            //         filename: filename || null, // ✅ Ensure filename is a string or nu
                            //         encoding: encoding || "binary",
                            //         mimetype: mimetype || "application/octet-stream"
                            //     };
                            //     console.log(trace(),`Received file: ${filename} (${mimetype})`);
                            // if NOT uploading a file:-
                                formData[fieldname] = {
                                    buffer: Buffer.concat(buffers) // ✅ Just store the raw data
                                };
                                console.log(trace(), `Received blob: ${fieldname}, size: ${formData[fieldname].buffer.length} bytes`);
                        });
                    });

                // Handle text fields
                    bb.on('field', (fieldname, value) => {
                        formData[fieldname] = value;
                    });

                bb.on('finish', async () => {
                    try{                
                        console.log(trace(),'Received form:-\n', formData);
                        console.log(trace(),'formData:-\n',formData);
                        console.log(trace(),'formData.image_date:-\n',formData.image_date);
                        console.log(trace(),"Final parsed formData:-\n");
                        Object.entries(formData).forEach(([key, value]) => {
                            console.log(trace(),`${key}:`, value);
                        });

                        // ✅ Store Blob & Metadata in SQLite
                        // const stmt = db.prepare(`
                        //                    INSERT INTO photos (image_blob, image_date, image_time, image_address, image_notes) VALUES (?, ?, ?, ?, ?)
                        // `);
                        const query = "INSERT INTO photos (image_blob, image_date, image_dd, image_mm, image_yyyy, image_time, image_address, image_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

                        // stmt.run(userEmailAddress, imageBlob, image_date, image_time, image_address, image_notes);
                        console.log(trace(),"SQLite query to be executed:-\n",query);
                        if (!formData.userEmailAddress) {
                            console.error(trace(), "❌ Missing userEmailAddress, cannot connect to database");
                            return res.status(400).json({ error: "Missing userEmailAddress" });
                        }
                        const dataFile = dataFilePathName(formData.userEmailAddress);
                        const filePath = dataFile.filePath;
                        const fileName = dataFile.fileName;
                        const dbFileName = `${filePath}${fileName}`;
                        const db = await getDB(dbFileName);
                        console.log(trace(),"Connected Database:-", db);

                        await db.run(query, [
                            // formData.image_blob, 
                            formData.image_blob?.buffer, // ✅ Pass only the buffer
                            formData.image_date, 
                            formData.image_dd, 
                            formData.image_mm, 
                            formData.image_yyyy, 
                            formData.image_time, 
                            formData.image_address, 
                            formData.image_notes
                        ]);

                        // // res.json({ status: "success", message: "Image stored in SQLite!" });
                        // res.status(200).json({ message: 'Upload successful', data: formData });
                        safeRespond(200, { message: 'Upload successful', data: formData, success: true });

                    } catch (err) {
                        console.error(trace(), '❌ Error saving to database:-\n', err);
                        safeRespond(500, { message: 'ERROR: Internal server error during DB operation', data: formData, success: false });
                    }
                });

                bb.on('error', (err) => {
                    console.error(trace(), '❌ Busboy error:', err);
                    if (!res.headersSent) {
                        // res.status(500).json({ error: 'Error parsing form data' });
                        safeRespond(500).json({ message: 'Error parsing form data', success: false });
                    }
                });
                req.on('error', (err) => {
                    console.error(trace(), '❌ Request stream error:', err);
                    safeRespond(500).json({ message: '❌ Request stream error', success: false });
                });

                req.pipe(bb);
                // - Starts parsing incoming form data (especially file uploads).
                // - Lets Busboy read chunks of the HTTP request as they arrive, making it super memory-efficient.
                // - Triggers various bb.on('file'...), bb.on('field'...), or bb.on('finish'...) events for you to handle uploads and form fields.
                // You’re basically connecting a readable stream (req) to a writable stream (bb) so that data flows in and gets parsed.

                // Explanation of the code:
                    // 1 - Set up utility guards: responseSent and safeRespond ensure only one response is sent.
                    // 2 - Initialize Busboy: Sets up parsing for multipart/form-data.
                    // 3 - Handle timeout: If the client stalls too long, return 408 Request Timeout.
                    // 4 - Start piping: req.pipe(bb) begins streaming request data into Busboy.
                    // 5 - Parse fields and files:
                    //     - bb.on('file'): Buffers incoming file chunks.
                    //     - bb.on('field'): Assigns key-value text fields.
                    // 6 - On finish:
                    //     - Validates required fields.
                    //     - Connects to SQLite and runs the query.
                    //     - Responds with 200 OK using safeRespond.
                    // 7 - Error listeners:
                    //     - bb.on('error'): Handles stream parsing issues.
                    //     - req.on('error'): Logs client stream errors.
                    //     - req.setTimeout(...): Prevents hanging connections.

            });
        // ADD NEW RECORD end
        // REPLACE RECORD BY ID start
            SQLiteRouter.post("/replace-record-by-id", async (req, res) => {
                console.log(trace(), '/replace-record-by-id:', req.body);
            });
        // REPLACE RECORD BY ID END
    // 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸
// Endpoint to save a photo record END

    SQLiteRouter.post("/get-all-photos", async (req, res) => {
        try {
            console.log(trace(), 'Received request with Content-Type:', req.headers['content-type']);
            console.log(trace(), 'Received request with "body":', req.body);

            const dataFile = dataFilePathName(req.body.userEmailAddress);
            const db = await getDB(`${req.body.userEmailAddress}`);
            
            // ✅ Use `db.all()` with `await` instead of callback-based `db.get()`
            const rows = await db.all("SELECT id, image_blob, image_date, image_time, image_address, image_notes FROM photos");

            if (!rows.length) {
                console.log(trace(), "No photos found.");
                return res.status(404).json({ message: "No photos found." });
            }

            console.log(trace(), rows);

            const formattedPhotos = rows.map(row => ({
                // image_blob: `data:image/png;base64,${row.image_blob.toString("base64")}`,
                image_id: row.id, 
                image_blob: row.image_blob 
                    ? `data:image/png;base64,${row.image_blob.toString("base64")}` 
                    : null, // ✅ If null, don't process
                image_date: row.image_date,
                image_time: row.image_time,
                image_address: row.image_address,
                image_notes: row.image_notes
            }));

            console.log(trace(), formattedPhotos);
            res.json(formattedPhotos);
        } catch (err) {
            console.error(trace(), "Database query error:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    });

    SQLiteRouter.post("/delete-record", async (req, res) => {
        console.log(trace(), `req.body`, req.body);
        const dataFile = dataFilePathName(req.body.userEmailAddress);
        const filePath = dataFile.filePath;
        const fileName = dataFile.fileName;
        const dbFileName = `${filePath}${fileName}`
        const { userEmailAddress, tableName, where } = req.body;

        const db = await getDB(dbFileName);

        function buildWhereClause({ conditions, logic = "AND" }) {
            if (!Array.isArray(conditions) || conditions.length === 0) {
                // 🚫 Reject empty conditions
                throw new Error("At least one WHERE condition is required for DELETE operation.");
            }

            const safeLogic = logic.toUpperCase() === "OR" ? "OR" : "AND";
            const clause = conditions.map(cond => `${cond.field} ${cond.operator} ?`).join(` ${safeLogic} `);
            const values = conditions.map(cond => cond.value);
            return { clause, values };
        }

        try {
            const { clause: whereClause, values: conditionValues } = buildWhereClause(where);

            console.log(`${trace()} 🗑️ Deleted record(s):`, `DELETE FROM ${tableName} WHERE ${whereClause}`, conditionValues);
            const result = await db.run(`DELETE FROM ${tableName} WHERE ${whereClause}`, conditionValues);
            console.log(`${trace()} 🗑️ Deleted record(s):`, result);

            res.json({ success: true, deleted: result.changes });
        } catch (err) {
            console.error(`${trace()} ❌ Deletion failed`, err);
            res.status(400).json({ success: false, error: err.message });
        }
    });
    SQLiteRouter.post("/delete-photo-by-id", async (req, res) => {
        try {
            const dataFile = dataFilePathName(req.body.userEmailAddress);
            const db = await getDB(`${req.body.fileName}`);
            // const result = await db.run("DELETE FROM photos WHERE id = ?", [req.body.image_id]);
            const result = await db.run(`DELETE FROM ${req.body.tableName} WHERE id = ?`, [req.body.recordIdToDELETE]);
            if (result.changes === 0) {
                return res.status(404).json({ message: `Record ${req.body.recordIdToDELETE} not found.`});
            }
            res.json({ message: `Record ${req.body.recordIdToDELETE} deleted successfully.`});
        } catch (err) {
            console.error("Database error:", err);
            res.status(500).json({ message: `Failed to delete record ${req.body.recordIdToDELETE}.`});
        }
    });

    SQLiteRouter.post("/filter-by", async (req, res) => {
        let db; // makes it visible to both try and catch.
        try{
            console.log(trace(), 'Received request with Content-Type:', req.headers['content-type']);
            console.log(trace(), 'Received request:', req.body);
            const dataFile = dataFilePathName(req.body.userEmailAddress);
            const dbFileName = `${dataFile.filePath}${dataFile.fileName}`
            const db = await getDB(`${dbFileName}`);

            const filterField = req.body.filterField || 'image_address'; // Default to 'image_address' if not provided
            // rows = await db.all("SELECT image_id, image_blob, image_date, image_time, image_address, image_notes FROM photos WHERE image_address LIKE ?", [req.body.addressPortion]);
            let rows;
            switch (filterField) {
                case 'address':
                    console.log(trace(), "Filtering by address");
                    rows = await db.all("SELECT image_id, image_blob, image_date, image_time, image_address, image_notes FROM photos WHERE image_address LIKE ?", [req.body.filterText]);
                    break;
                case 'note':
                    console.log(trace(), "Filtering by note");
                    rows = await db.all("SELECT image_id, image_blob, image_date, image_time, image_address, image_notes FROM photos WHERE image_notes LIKE ?", [req.body.filterText]);
                    break;
                case 'date':
                    console.log(trace(), "Filtering by date");
                    rows = await db.all("SELECT image_id, image_blob, image_date, image_time, image_address, image_notes FROM photos WHERE image_dd = ? AND  image_mm = ? AND  image_yyyy = ?", [req.body.dateDD, req.body.dateMM, req.body.dateYYYY]);
                    break;
                default:
                    console.log(trace(), "Filtering by default field (image_address)");
                    rows = await db.all("SELECT image_id, image_blob, image_date, image_time, image_address, image_notes FROM photos WHERE image_address LIKE ?", [req.body.filterText]);
                    break;
            }
            
            if (!rows.length) {
                console.log(trace(), "No photos found.");
                return res.status(404).json({ message: "No photos found." });
            }

            console.log(trace(), "Record(s) retrieved:-\n",rows);

            const formattedPhotos = rows.map(row => ({
                // image_blob: `data:image/png;base64,${row.image_blob.toString("base64")}`,
                image_id: row.image_id, 
                image_blob: row.image_blob 
                    ? `data:image/png;base64,${row.image_blob.toString("base64")}` 
                    : null, // ✅ If null, don't process
                image_date: row.image_date,
                image_time: row.image_time,
                image_address: row.image_address,
                image_notes: row.image_notes
            }));

            // console.log(trace(), formattedPhotos);
            res.status(200).json({success: true, formattedPhotos: formattedPhotos});
        } catch (err) {
            if(!db) {
                console.error(trace(), "❌ Database connection failed for user:", req.body.userEmailAddress);
                res.status(401).json({ success: false, message: `Database connection failed.\nAre you signed in?\nCheck the padlock icon at top right of screen.`, error: err }); 
            } else {
                console.error("Database error:", err);
                res.status(500).json({ success: false, message: `Failed to filter.`, error: err });
            }
        }
    });

    export async function updateFormDataRecord({ fileName, tableName, updates, where }) {
    }
    export async function updateDataRecord({ fileName, tableName, updates, where }) {
        console.log(trace(), fileName, tableName, updates, where);
        const dataFile = dataFilePathName(fileName);
        const filePath = dataFile.filePath;
        const fileName2 = dataFile.fileName;
        const dbFileName = `${filePath}${fileName2}`;

        console.log(trace(), '🔧 Updates object:', updates);

        function buildWhereClause({ conditions, logic = "AND" }) {
            if (!Array.isArray(conditions) || conditions.length === 0) {
                return { clause: "1", values: [] }; // no conditions = update all
            }

            const safeLogic = logic.toUpperCase() === "OR" ? "OR" : "AND";

            const clause = conditions
                .map(cond => `${cond.field} ${cond.operator} ?`)
                .join(` ${safeLogic} `);

            const values = conditions.map(cond => cond.value);

            console.log(trace(), clause, values);
            return { clause, values };
        }
    
        const db = await getDB(dbFileName);

        const columns = await db.all(`PRAGMA table_info(${tableName});`);
        console.log(trace(), '🧬 Table columns:', columns.map(c => c.name));

        // Modular WHERE clause
        const { clause: whereClause, values: conditionValues } = buildWhereClause(where);
        const match = await db.get(`SELECT * FROM ${tableName} WHERE ${whereClause}`, conditionValues);
        console.log(trace(), '🔍 Matching record:', match);

        // SET clause
        const setClause = Object.keys(updates).map(key => `${key} = ?`).join(", ");
        const updateValues = Object.values(updates);

        const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
        const params = [...updateValues, ...conditionValues];

        console.log(`${trace()} query: ${query}`);
        console.log(`${trace()} params:`, params);

        try {
            // const result = await db.exec(query, params);
            const result = await db.run(query, params);
            console.log(trace(), result);

            if (fileName === "users_1000.db") {
                optPer(fileName); // optimize after a successful write
                const walStats = await db.get("PRAGMA wal_checkpoint(PASSIVE);");
                console.log(trace(), "🔍 WAL checkpoint stats:", walStats);
            }

            const verify = await db.get(`SELECT * FROM ${tableName} WHERE ${whereClause}`, conditionValues);
            console.log(trace(), '🔍 Post-update record:', verify);

            console.log(`${trace()} 🟢 Updated ok`, { fileName, tableName, updates, where });
            return { success: true, message: updates };
        } catch (err) {
            console.error(`${trace()} 🔴 Update failed`, { fileName, tableName, updates, where }, err);
            return { success: false, message: updates };
        }
    }
    SQLiteRouter.post("/update-form-data-record", async (req, res) => {
    });
    SQLiteRouter.post("/update-data-record", async (req, res) => {
        //  // server uses:- app.use(express.json()); // Middleware to parse JSON data
            console.log(trace(),"/update-record req.body:-\n",req.body);
            console.log(trace(),"/update-record req.body:-\n",JSON.stringify(req.body,null,2));
            //     NO! console.log(trace(),"/update-record req.body:-\n",JSON.parse(req.body));
        //  // server uses:- app.use(express.json()); // Middleware to parse JSON data
        const { fileName, tableName, updates, where } = req.body;
        console.log(trace(),fileName);
        console.log(trace(),tableName);
        console.log(trace(),updates);
        console.log(trace(),where);
        // updateRecord({fileName, tableName, updates, where});
        const dataFile = dataFilePathName(req.body.userEmailAddress);
        const response = await updateDataRecord(req.body);
        res.status(200).json({
            success: response.success,
            message: response.message,
            fileName: fileName,
            tableName: tableName,
            updates: updates,
            where: where
        });
    });

// 🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️ database housekeeping 🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️
    // close a single user's database
        export async function closeDB(payload) {
            console.log(`${trace()} ⚪ closeDB() payload:-`,payload);
            const dataFile = dataFilePathName(payload.userEmailAddress);
            const filePath = dataFile.filePath;
            const fileName = dataFile.fileName;
            const dbFileName = `${filePath}${fileName}`
            console.log(`${trace()} ⚪ Database to close:-`,payload.userEmailAddress, filePath, fileName, dbFileName);
            const db = dbInstances.get(dbFileName);
            if (db) {
                try {
                    await db.close(); // Release SQLite lock
                    dbInstances.delete(dbFileName); // Remove from in-memory cache
                    console.log(`${trace()} 🟢 Database ${dbFileName} closed (file remains).`);
                    console.log(`${trace()} 🟢 Databases still open:-`, dbInstances);
                } catch (error) {
                    console.error(`${trace()} 🔴 Error closing ${dbFileName}:`, error);
                    console.error(`${trace()} 🔴 Databases still open:-`, dbInstances);
                }
            } else {
                console.log(`${trace()} ⚪ Database ${dbFileName} not found in cache — nothing to close.`);
                console.log(`${trace()} ⚪ Databases still open:-`, dbInstances);
            }
        }

    // close all databases
        export async function closeAllDatabases() {
            const total = dbInstances.size;
            if (total === 0) return;
            console.log(trace(),`\n🛑 Closing ${total} active database connections...`);
            for (const [dbFileName, dbPromise] of dbInstances) {
                try {
                    const db = await dbPromise; // Ensure we wait for the init to finish
                    await db.close();
                    console.log(trace(),`   ✅ Closed: ${dbFileName}`);
                } catch (err) {
                    console.error(trace(),`   ❌ Error closing ${dbFileName}:`, err);
                }
            }
            dbInstances.clear(); // Empty the Map so they don't get reused
            console.log(trace(),'🏁 All database connections cleared.\n');
        }

    // get an array of all open databases
        export function getActiveDatabases() {
            return Array.from(dbInstances.keys());
        }

    // trigger when node.js stops
        // In Node.js, process represents the actual running application. 
        // These lines tell your app: 
        // "If someone tries to kill this process, 
        // don't just vanish—finish your chores first."
        process.on('SIGINT', async () => { // process.on listens for a signal from the operating signal
            // SIGINT = signal interrupt
            await closeAllDatabases(); // this ensures that if the shutdown takes a second (because it's closing 50 databases), the app waits for that to finish before finally disappearing.
            process.exit(0);
        });

        process.on('SIGTERM', async () => { // process.on listens for a signal from the operating signal
            // SIGTERM = signal terminate
            await closeAllDatabases(); // this ensures that if the shutdown takes a second (because it's closing 50 databases), the app waits for that to finish before finally disappearing.
            process.exit(0);
        });

    // close users_1000.db if no other databases are open - check hourly START
        // TO-DO - link this to session management, close databases where user has been idle for ??? perod of time
        // TODO: Close user SQLite DBs when owning session becomes idle
        // Close per-user SQLite DBs when sessions are idle/expired.
        // If no user DBs remain, close users_1000.db as well.
        const ONE_HOUR = 60 * 60 * 1000;
        const BASE_DB_NAME_SHORT = "users_1000.db";
        const BASE_DB_NAME_LONG = `${process.env.APP_PATH_TO_DATA}users_1000.db`;
        setInterval(async () => {
            try {
                if (
                    dbInstances.size === 1 &&
                    (dbInstances.has(BASE_DB_NAME_SHORT) ||
                    dbInstances.has(BASE_DB_NAME_LONG))
                )  {
                    console.log("[DB Watchdog] No user DBs open. Closing all databases.");
                    await closeAllDatabases();
                } else {
                    console.log(`[DB Watchdog] ${dbInstances.size} user DB(s) still active.`);
                }
            } catch (err) {
                console.error("[DB Watchdog] Error during DB cleanup:", err);
            }
        }, ONE_HOUR);
    // close users_1000.db if no other databases are open - check hourly END

// 🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️ database housekeeping 🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️🗃️

export default SQLiteRouter;