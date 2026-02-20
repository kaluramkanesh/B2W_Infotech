require("dotenv").config();

const fs = require("fs");
const { Worker } = require("worker_threads");
const path = require("path");

// ⭐ uploads folder path
const uploadDir = path.join(__dirname, "uploads");

// ✅ Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Uploads folder created");
}

// ⭐ absolute excel file path
const filePath = path.join(uploadDir, "bigfile.xlsx");

console.log("Processing file:", filePath);

// // ✅ Memory monitor
// setInterval(() => {

//     const memory = process.memoryUsage();

//     console.log("Memory Usage:");
//     console.log("RSS:", Math.round(memory.rss / 1024 / 1024), "MB");
//     console.log("Heap Used:", Math.round(memory.heapUsed / 1024 / 1024), "MB");

// }, 5000);

// ✅ Start worker thread
new Worker(path.join(__dirname, "workers", "excel.worker.js"), {
    workerData: {
        filePath
    }
});
