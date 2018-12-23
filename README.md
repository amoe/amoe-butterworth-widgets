# widgets3

## Usage instructions

There is no default export.  A named export `WidgetView` is exported.

## Releasing a new version

Steps:

Bump version number in package.json

Run 

    ./node_modules/.bin/vue-cli-service build --target lib --name amoe-butterworth-widgets src/library-entry.ts

Now `npm publish`
