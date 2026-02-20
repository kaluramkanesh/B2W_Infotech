require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { workerData, parentPort } = require("worker_threads");

const connectDB = require("../config/db");
const streamExcel = require("../services/excelStream.service");
const insertBatch = require("../services/batch.service");
const validate = require("../utils/validator");

const ErrorLog = require("../models/ErrorLog.model");
const JobProgress = require("../models/JobProgress.model");

const BATCH_SIZE = 1000;

(async () => {

    try {

        console.log("Worker started");
        console.log("Processing file:", workerData.filePath);


        const dir = path.dirname(workerData.filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }


        await connectDB();
        console.log("MongoDB Connected inside worker");

        let batch = [];
        let processed = 0;
        let failed = 0;
        let batchNumber = 0;


        await streamExcel(workerData.filePath, async (row) => {

            try {

                const data = validate(row);
                batch.push(data);

            } catch (err) {

                failed++;

                await ErrorLog.create({
                    row,
                    error: err.message
                });
            }

            if (batch.length >= BATCH_SIZE) {

                batchNumber++;

                await insertBatch(batch);

                processed += batch.length;

                await JobProgress.updateOne(
                    { fileName: workerData.filePath },
                    {
                        processedRows: processed,
                        failedRows: failed,
                        batchNumber
                    },
                    { upsert: true }
                );

                // console.log(`Inserted batch ${batchNumber}`);

                batch = [];
            }

        });

        if (batch.length > 0) {

            batchNumber++;

            await insertBatch(batch);

            processed += batch.length;

            await JobProgress.updateOne(
                { fileName: workerData.filePath },
                {
                    processedRows: processed,
                    failedRows: failed,
                    batchNumber
                },
                { upsert: true }
            );

            console.log(`Inserted final batch ${batchNumber}`);
        }

        console.log("Excel processing completed successfully");

        if (parentPort) {
            parentPort.postMessage("DONE");
        }

    } catch (error) {

        console.error("Worker crashed:", error);

        if (parentPort) {
            parentPort.postMessage({ error: error.message });
        }
    }

})();
