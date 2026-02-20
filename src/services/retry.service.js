async function retry(fn, maxRetry = 3) {

    let attempt = 0;

    while (attempt < maxRetry) {

        try {
            return await fn();
        } catch (err) {

            attempt++;

            if (attempt === maxRetry) {
                throw err;
            }

            console.log("Retrying batch...", attempt);
            await new Promise(res => setTimeout(res, 2000));
        }
    }
}

module.exports = retry;
