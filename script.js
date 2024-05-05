function createRandomPromise() {
    const randomTime = Math.floor(Math.random() * 3) + 1;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(randomTime);
        }, randomTime * 1000);
    });
}

// Table element reference
const table = document.getElementById('output');

// Add loading text to the table
const loadingRow = table.insertRow();
const loadingCell = loadingRow.insertCell();
loadingCell.textContent = 'Loading...';
loadingCell.colSpan = 2;

// Create an array of 3 promises
const promises = [createRandomPromise(), createRandomPromise(), createRandomPromise()];

// Wait for all promises to resolve
Promise.all(promises)
    .then(times => {
        // Remove loading text
        table.deleteRow(0);
        
        // Populate the table with results
        times.forEach((time, index) => {
            const row = table.insertRow();
            const promiseCell = row.insertCell();
            const timeCell = row.insertCell();
            promiseCell.textContent = `Promise ${index + 1}`;
            timeCell.textContent = time;
        });

        // Calculate and display total time
        const totalTime = times.reduce((acc, curr) => acc + curr, 0);
        const totalRow = table.insertRow();
        const totalCell = totalRow.insertCell();
        const totalValueCell = totalRow.insertCell();
        totalCell.textContent = 'Total';
        totalValueCell.textContent = totalTime.toFixed(3);
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
