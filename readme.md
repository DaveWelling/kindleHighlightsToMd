The bookmarklet will extract the highlights and notes from the most recent book in
https://read.amazon.com/notebook and give you a json file with them.

To use the bookmarklet,

```
node ./tools/minify.js
```

will create ./dist/bookmarklet.min.js.

Create a bookmark in chrome, calling it whatever you want, but paste the contents of ./dist/bookmarklet.min.js. into the url.

Open https://read.amazon.com/notebook and click the bookmark. It will give you the json.

Update HIGHLIGHTS_JSON_PATH constant in ./src/organizeIntoMd.js with the path of the json you just received.

```
node ./src/organizeIntoMd.js
```

This will create a markdown file ./dist/organized_highlights.md
