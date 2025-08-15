const express = require("express");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const exifParser = require("exif-parser");
const sizeOf = require("image-size");

npm install multer exif-parser image-size

// Setup SQLite
    const db = new sqlite3.Database("images.db");
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT,
            mime_type TEXT,
            image_data BLOB
            )
        `);
    });
    // OR
    const dbWithMetadata = new sqlite3.Database("imagesWithMetadata.db");
    db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT,
        mime_type TEXT,
        image_size INTEGER,
        width INTEGER,
        height INTEGER,
        exif_make TEXT,
        exif_model TEXT,
        exif_datetime TEXT,
        gps_lat REAL,
        gps_lon REAL,
        uploaded_at TEXT,
        image_data BLOB
        )
    `);
    });

// Setup Multer (store in memory)
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    // // OR
    // // Multer (memory storage)
    // const upload = multer({ storage: multer.memoryStorage() });

// Upload endpoint
    app.post("/upload-image", upload.single("image"), (req, res) => {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No image uploaded." });
        }

        const { originalname, mimetype, buffer } = file;

        db.run(
            `INSERT INTO images (filename, mime_type, image_data) VALUES (?, ?, ?)`,
            [originalname, mimetype, buffer],
            function (err) {
                if (err) {
                    console.error("DB insert error:", err);
                    return res.status(500).json({ message: "Database error." });
                }
                res.json({ success: true, message: "Image uploaded and stored in database." });
            }
        );
    });
// Image upload with MetaData route
    app.post("/upload-image", upload.single("image"), (req, res) => {
        const file = req.file;
        if (!file) return res.status(400).json({ message: "No image uploaded." });

        const { originalname, mimetype, buffer, size } = file;
        let width = null, height = null;
        let make = null, model = null, dateTimeOriginal = null;
        let gpsLat = null, gpsLon = null;

        // 🧠 Try to extract image dimensions
        try {
            const dimensions = sizeOf(buffer);
            width = dimensions.width;
            height = dimensions.height;
        } catch (e) {
            console.warn("Could not get dimensions:", e.message);
        }

        // 🧠 Try to extract EXIF metadata
        try {
            const parser = exifParser.create(buffer);
            const result = parser.parse();
            make = result.tags.Make || null;
            model = result.tags.Model || null;
            dateTimeOriginal = result.tags.DateTimeOriginal || null;

            if (result.tags.GPSLatitude && result.tags.GPSLongitude) {
                gpsLat = result.tags.GPSLatitude;
                gpsLon = result.tags.GPSLongitude;
            }
        } catch (e) {
            console.warn("Could not parse EXIF:", e.message);
        }

        const uploadedAt = new Date().toISOString();

        console.log("Full EXIF tags:", result.tags);

        db.run(
            `
            INSERT INTO images 
            (filename, mime_type, image_size, width, height, exif_make, exif_model, exif_datetime, gps_lat, gps_lon, uploaded_at, image_data) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                originalname, mimetype, size,
                width, height,
                make, model, dateTimeOriginal,
                gpsLat, gpsLon,
                uploadedAt, buffer
            ],
            function (err) {
                if (err) {
                    console.error("DB insert error:", err);
                    return res.status(500).json({ message: "Database error." });
                }
                res.json({ success: true, message: "Image and metadata stored.", id: this.lastID });
            }
        );
    });