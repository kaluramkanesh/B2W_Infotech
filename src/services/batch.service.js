const Data = require("../models/user.model");
const retry = require("./retry.service");

async function insertBatch(batch) {

    await retry(async () => {

        await Data.insertMany(batch, {
            ordered: false
        });

    });

}

module.exports = insertBatch;
