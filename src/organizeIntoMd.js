const fs = require('fs');
const path = require('path');
const { set, get } = require('lodash');
const HIGHLIGHTS_JSON_PATH =
    'C:\\Users\\david\\Downloads\\The_Principles_of_Product_Development_Flow__Second_Generation_Lean_Product_Development_highlights.json';

try {
    // read json from this file C:\Users\me\Downloads\Some_Book_highlights.json
    const json = JSON.parse(fs.readFileSync(HIGHLIGHTS_JSON_PATH, 'utf8'));
    const highlights = json.highlights;
    const asin = json.asin;

    let markdown = '';
    // create a hierarchy of the highlights using color
    // Headers:
    // level 0: color === "Orange" highlights starting with a number are the top level chapters
    // level 2: color === "Orange" highlights starting with one or two letters, a number and a colon are principles
    // level 1: all other color === "Orange" highlights are subchapters containing principles
    // Content:
    // color === "Yellow" highlights are regular
    // color === "Blue" highlights are examples
    // color === "Pink" highlights are important
    let currentChapter, currentSubchapter, currentPrinciple;
    highlights.forEach((highlight) => {
        // Headers of various types are Orange highlights
        if (highlight.color === 'Orange') {
            if (highlight.text.match(/^\d/)) {
                currentChapter = highlight.text;
                currentSubchapter = undefined;
                currentPrinciple = undefined;
                markdown += `# ${highlight.text}\n`;
            } else if (highlight.text.match(/^[a-zA-Z]{1,2}\d:/)) {
                currentPrinciple = highlight.text;
                markdown += `### ${highlight.text}\n`;
            } else {
                currentSubchapter = highlight.text;
                currentPrinciple = undefined;
                markdown += `## ${highlight.text}\n`;
            }
        } else {
            // Everything else is content and goes underneath the headers
            let highlightPath = [currentChapter, currentSubchapter, currentPrinciple, 'highlights'];
            // remove undefined values
            highlightPath = highlightPath.filter((value) => value !== undefined);
            // depth is not really used now, but might be useful to others using the coe
            const depth = highlightPath.length;

            // Format the content based on the color of the highlight
            if (highlight.color === 'Blue') {
                markdown += `> [${highlight.text ?? highlight.note}](kindle://book/?action=open&asin=${asin}&location=${
                    highlight.location
                }&)\n`;
                if (highlight.text && highlight.note) {
                    markdown += `> ${highlight.note}\n`;
                }
            } else if (highlight.color === 'Pink') {
                markdown += `* **[${
                    highlight.text ?? highlight.note
                }](kindle://book/?action=open&asin=${asin}&location=${highlight.location}&)**\n`;
                if (highlight.text && highlight.note) {
                    markdown += `  * ${highlight.note}\n`;
                }
            } else {
                markdown += `* [${highlight.text ?? highlight.note}](kindle://book/?action=open&asin=${asin}&location=${
                    highlight.location
                }&)\n`;
                if (highlight.text && highlight.note) {
                    markdown += `  * ${highlight.note}\n`;
                }
            }
        }
    });

    // Save results to a markdown file in the ../dist folder
    console.log('Writing the file');
    const outputPath = path.join(__dirname, '..', 'dist', 'organized_highlights.md');
    fs.writeFileSync(outputPath, markdown);
    console.log(`Highlights and notes saved to ${outputPath}`);
} catch (err) {
    console.error('An error occurred:', err);
}
