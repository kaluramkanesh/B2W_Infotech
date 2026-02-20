# High Performance Bulk Excel Processing (Node.js)

This project implements a **high-performance bulk Excel processing system** in Node.js that can handle extremely large Excel files (up to millions of rows) efficiently while maintaining:

- Low memory usage
- Non-blocking event loop
- High performance under heavy load
- Safe retry handling
- Background processing

This implementation follows streaming-based architecture to avoid loading the entire file into memory.

---

## 📌 Architecture Overview

The system consists of two main phases:

### 1️⃣ Excel File Generation (Testing Purpose)

A large Excel file (up to 5 million rows) is generated using streaming write to simulate real-world large datasets.


Features:

- Streaming writer (ExcelJS)
- Dynamic test data generation
- Event loop safe (yielding)
- Constant memory usage

---

### 2️⃣ Background Processing (Worker Thread)

Excel processing runs in a Worker Thread to keep the main Node.js event loop free.

1. node src/generateExcel.js
src/uploads/bigfile.xlsx
2. node src/startWorker.js
