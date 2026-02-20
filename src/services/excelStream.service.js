const ExcelJS = require("exceljs");

async function streamExcel(filePath, onRow) {

    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(filePath);

    for await (const worksheet of workbook) {

        for await (const row of worksheet) {

            await onRow(row.values);

        }

    }

}

module.exports = streamExcel;
