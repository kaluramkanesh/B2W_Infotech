module.exports = (row) => {

    if (!row[1] || !row[2]) {
        throw new Error("Invalid row");
    }

    return {
        name: row[1],
        email: row[2],
        phone: row[3]
    };
};
