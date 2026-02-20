const mongoose = require("mongoose");

module.exports = mongoose.model(
    "ErrorLog",
    new mongoose.Schema({
        row: Object,
        error: String
    })
);
