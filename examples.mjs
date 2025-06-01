export async function processData() {
    const task2 = sendEmail(); // Email dispatch
    const task3 = writeToDB(); // Database update
    const task1 = fetchData(); // Simulated API call

    try {

        // // romise.all() Short-Circuits on Rejection - If any promise rejects, Promise.all() immediately stops waiting for others.
        //     const [result1, result2, result3] = await Promise.all([task1, task2, task3]);
        // // romise.all() Short-Circuits on Rejection - If any promise rejects, Promise.all() immediately stops waiting for others.

        // - Promise.allSettled() ensures all tasks finish, even if one fails. - Each task logs its result—whether fulfilled (status: "fulfilled") or failed (status: "rejected").
            const [result1, result2, result3] = await Promise.allSettled([task1, task2, task3]);
        // - Promise.allSettled() ensures all tasks finish, even if one fails. - Each task logs its result—whether fulfilled (status: "fulfilled") or failed (status: "rejected").

        console.log("✅ All tasks completed:", result1, result2, result3);
        return "Next step now runs!";
    } catch (error) {
        console.error("🔴 One or more tasks failed:", error);
    }
}

function fetchData() {
    return new Promise((resolve, reject) => {
        try {
            console.log("1");
            if (1 != 2) {
                throw new Error("Intentional failure in fetchData()");
            }
            resolve({
                ok: true,
                errorDetails: "none",
                message: "1 completed."
            });
        } catch (error) {
            reject({
                ok: false,
                errorDetails: `${error.name} <> ${(error.cause ? error.cause.message : "no cause")} <> ${error.message}`,
                message: "1 failed."
            });
        }
    });
}

function sendEmail() {
    return new Promise(resolve => {
        for (let n = 0; n < 1000000000; n++) { /* Simulated delay */ }
        console.log("2");
        resolve({ ok: true, errorDetails: "none", message: "2 completed." });
    });
}

async function writeToDB() {
    try {
        const fetchUrl = "https://yourdomain.com/loginRouter/login_step3"; // 🔥 Ensure a valid full URL
        const fetchOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmailAddress: "...",
                createNewAccount: true
            })
        };

        const response = await fetch(fetchUrl, fetchOptions);

        return { ok: true, errorDetails: "none", message: "3 completed." };
    } catch (error) {
        return {
            ok: false,
            errorDetails: `${error.name} <> ${error.cause ? error.cause.message : "no cause"} <> ${error.message}`,
            message: "3 failed."
        };
    }
}
// processData();


// sessionManagement.js
import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import { randomUUID } from 'crypto';

// Create the Express app
const app = express();

// Async function to create and return a RedisStore instance
async function createRedisStore() {
  // Create a Redis client
  const redisClient = createClient();

  redisClient.on('error', (err) => {
    console.error('🔴 Redis Client Error', err);
  });

  // Connect to the Redis server (make sure your Node version supports top-level await or use this inside an async function)
  await redisClient.connect();

  // Create an instance of RedisStore using the connected client
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:', // Optional prefix for session keys in Redis
  });

  console.log('🟢 Redis is set up.');
  return redisStore;
}

// Function to set up the Express session middleware with the provided RedisStore
function setupExpressSession(redisStore) {
  app.use(
    session({
      store: redisStore,
      // Generate a unique session ID
      genid: (req) => randomUUID(),
      secret: process.env.SESSION_KEY || 'your-secret-key', // Replace with your secret or fallback value
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,    // Set to true for HTTPS in production
        httpOnly: true,   // Helps mitigate XSS
        sameSite: 'strict', // Helps mitigate CSRF
        maxAge: 15 * 60 * 1000, // Session expires after 15 minutes
      },
    })
  );
  console.log('🟢 Express session management is set up.');
}

// Main async function to set up session management
async function setupSessionManagement() {
  try {
    // Wait for the Redis store to be created
    const redisStore = await createRedisStore();

    // Set up Express session using the RedisStore instance
    setupExpressSession(redisStore);

    console.log('✅ All session management setup complete.');
  } catch (error) {
    console.error('🔴 Error setting up session management:', error);
  }
}

// Initialize session management
setupSessionManagement();

// Example Express route to test session functionality
app.get('/', (req, res) => {
  req.session.views = req.session.views ? req.session.views + 1 : 1;
  res.send(`Number of views: ${req.session.views}`);
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;