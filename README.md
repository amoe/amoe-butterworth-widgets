# widgets3

## Usage instructions

There is no default export.  A named export `WidgetView` is exported.

The WidgetView takes a single prop, `taxonomies`.  This is an object defining
a set of available taxonomies.  The string key is used to uniquely identify
the taxonomy.  The taxonomy should have a single root node.

## Releasing a new version

Steps:

Bump version number in package.json

Run 

    ./node_modules/.bin/vue-cli-service build --target lib --name amoe-butterworth-widgets src/library-entry.ts

Now `npm publish`
