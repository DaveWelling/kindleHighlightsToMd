const fs = require('fs');
const path = require('path');

// Input and output file paths
const inputFilePath = path.join(__dirname, '..', 'src', 'bookmarklet.js'); // Replace 'input.txt' with your file name
const outputFilePath = path.join(__dirname, '..', 'dist', 'bookmarklet.min.js'); // Output file name

// Read the file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Remove carriage returns and line feeds
    const cleanedData = data.replace(/[\r\n]/g, '');

    // Write the cleaned content to a new file
    fs.writeFile(outputFilePath, cleanedData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }

        console.log('File has been cleaned and saved as', outputFilePath);
    });
});
