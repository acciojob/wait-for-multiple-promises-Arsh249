// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(index) {
  const time = Math.floor(Math.random() * 3000) + 1000; // Random time between 1000 and 3000 ms
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ index, time });
    }, time);
  });
}

// Create an array of 3 promises
const promises = [
  createRandomPromise(1),
  createRandomPromise(2),
  createRandomPromise(3),
];

// By default, add a row that spans 2 columns with the exact text Loading...
const tableBody = document.getElementById('output');
const loadingRow = document.createElement('tr');
loadingRow.innerHTML = '<td colspan="2">Loading...</td>';
tableBody.appendChild(loadingRow);

// Wait for all promises to resolve using Promise.all()
const startTime = performance.now();
Promise.all(promises).then(results => {
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000; // Convert to seconds

  // Remove the loading text
  tableBody.innerHTML = '';

  // Populate the table with the required values
  results.forEach(result => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>Promise ${result.index}</td><td>${(result.time / 1000).toFixed(3)}</td>`;
    tableBody.appendChild(row);
  });

  // Add the total row
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`;
  tableBody.appendChild(totalRow);
});
