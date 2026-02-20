require("dotenv").config();

const fs = require("fs");
const { Worker } = require("worker_threads");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Uploads folder created");
}


const filePath = path.join(uploadDir, "bigfile.xlsx");

console.log("Processing file:", filePath);

// for memory user monitor how much worker is using memory
// setInterval(() => {

//     const memory = process.memoryUsage();

//     console.log("Memory Usage:");
//     console.log("RSS:", Math.round(memory.rss / 1024 / 1024), "MB");
//     console.log("Heap Used:", Math.round(memory.heapUsed / 1024 / 1024), "MB");

// }, 5000);


new Worker(path.join(__dirname, "workers", "excel.worker.js"), {
    workerData: {
        filePath
    }
});
