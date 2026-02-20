require("dotenv").config();

const ExcelJS = require("exceljs");
const path = require("path");

const TOTAL_ROWS = 1048577;
const BATCH_YIELD = 50000;

const firstNames = [
    "Amit", "Rahul", "Priya", "Neha", "Rohit", "Anjali", "Vikas", "Sneha",
    "Arjun", "Kavya", "Suresh", "Pooja", "Vivek", "Riya", "Karan", "Meera"
];

const lastNames = [
    "Sharma", "Verma", "Patel", "Yadav", "Singh", "Gupta",
    "Mehta", "Joshi", "Reddy", "Kumar", "Jain", "Chopra"
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateMobile(index) {
    return `9${String(100000000 + index).slice(0, 9)}`;
}

async function generateExcel() {

    const filePath = path.join(__dirname, "uploads", "bigfile.xlsx");

    console.log("Generating Excel:", filePath);

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
        filename: filePath,
        useStyles: false,
        useSharedStrings: false
    });

    const worksheet = workbook.addWorksheet("Data");

    worksheet.addRow(["Name", "Email", "Phone"]).commit();

    for (let i = 1; i <= TOTAL_ROWS; i++) {

        let name, email, phone;

        // ⭐ Partial failure every 100 rows
        if (i % 100 === 0) {

            // intentionally invalid data
            name = "";                    // empty name
            email = "invalid-email";     // wrong format
            phone = null;                // missing phone

        } else {

            const first = getRandom(firstNames);
            const last = getRandom(lastNames);

            name = `${first} ${last}`;
            email = `${first.toLowerCase()}.${last.toLowerCase()}${i}@mail.com`;
            phone = generateMobile(i);
        }

        worksheet.addRow([name, email, phone]).commit();

        if (i % 100000 === 0) {
            console.log(`Generated ${i} rows`);
        }

        // prevent event loop freeze
        if (i % BATCH_YIELD === 0) {
            await new Promise(resolve => setImmediate(resolve));
        }
    }

    await workbook.commit();

    console.log("Excel generation complete 🚀");
}

generateExcel();
