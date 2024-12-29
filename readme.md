# Extract your Kindle highlights and notes

The bookmarklet will extract the highlights and notes from the most recent book (or whatever book is displayed) in
https://read.amazon.com/notebook and give you a json file with them.

The `organizeIntoMd.js` code will turn the extracted json into a markdown file which is organized based on the colors you used to highlight the book. You will probably want to fiddle with it to get the layout how you would prefer based on the colors of your highlights.

## To use the bookmarklet,

Create a bookmark in chrome. Call it whatever you want, but paste the contents of ./dist/bookmarklet.min.js. into the url.

Open https://read.amazon.com/notebook and click the bookmark. It will give you the json.

## To change the extracted JSON into a markdown file

Update HIGHLIGHTS_JSON_PATH constant in ./src/organizeIntoMd.js with the path of the json you just received. Then run:

```
node ./src/organizeIntoMd.js
```

This will create a markdown file ./dist/organized_highlights.md

### Current expectations for how the book was highlighted

_**You should probably change organizeIntoMd to set whatever expectations you want.**_ Currently it assumes that:

-   Headers
    -   Chapters are Orange highlights and in the form: `/^\d/)` (e.g. _1 Some Chapter Title_)
    -   Sub-chapters are Orange highlights and **not** in the form for Chapters or Principles (see below)
    -   Principles are Orange highlights and in the form: `/^[a-zA-Z]{1,2}\d:/` (e.g. _Pr1 Some Principle Idea_)
-   Content (inside Headers)
    -   Examples are Blue highlights
    -   Important things are Pink highlights
    -   Regular highlights are Yellow highlights

## If you need to make a change to the bookmarklet

```
node ./tools/minify.js
```

will recreate ./dist/bookmarklet.min.js.

You'll need to edit your Chrome bookmark and paste the changed bookmarklet.min.js content into the url.
