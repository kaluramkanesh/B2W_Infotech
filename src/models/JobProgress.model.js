const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    fileName: String,
    totalRows: Number,
    processedRows: Number,
    failedRows: Number,
    batchNumber: Number
});

module.exports = mongoose.model("JobProgress", schema);
