javascript: (function () {
    function downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    try {
        const asinInput = document.querySelector('#kp-notebook-annotations-asin');
        const asin = asinInput?.value;
        const highlights = Array.from(document.querySelectorAll('.kp-notebook-row-separator'))
            .map((highlight) => {
                let color, location;
                const annotationHighlightHeader = highlight.querySelector('#annotationHighlightHeader');
                if (annotationHighlightHeader) {
                    [color, location] = annotationHighlightHeader.innerText.split(' highlight | Location: ');
                }
                const text = highlight.querySelector('#highlight')?.innerText.trim();
                const note = highlight.querySelector('#note')?.innerText.trim() || undefined;
                const hold = { color, location, text, note };
                return { ...hold };
            })
            .filter((highlight) => highlight.text || highlight.note);

        const bookTitle =
            document
                .querySelector('#annotation-scroller > div > div.a-row.a-spacing-base > div.a-column.a-span5 > h3')
                ?.innerText.trim() || 'Untitled Book';

        if (highlights.length === 0) {
            alert('No highlights found for the first book.');
            return;
        }

        const result = { title: bookTitle, asin, highlights };
        downloadJSON(result, `${bookTitle.replace(/[^a-zA-Z0-9]/g, '_')}_highlights.json`);
    } catch (error) {
        console.error('An error occurred:', error);
        alert('Failed to extract highlights. Check the console for details.');
    }
})();
