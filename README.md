# widgets3

[![npm version](https://badge.fury.io/js/amoe-butterworth-widgets.svg)](https://badge.fury.io/js/amoe-butterworth-widgets)

## Usage instructions

There is no default export.  A named export `WidgetView` is exported.

The WidgetView takes a single prop, `taxonomies`.  This is an object defining
a set of available taxonomies.  The string key is used to uniquely identify
the taxonomy.  The taxonomy should have a single root node.

To get the needed CSS rules, you should do the following either within a
component or within your entry point.

    import 'amoe-butterworth-widgets/dist/amoe-butterworth-widgets.css';


Include the Vuex module into your store like so.

    import Vuex from 'vuex';
    import { WidgetsModule } from 'amoe-butterworth-widgets';

    Vue.use(Vuex);

    export default new Vuex.Store({
        // [rest of store definition omitted]
        modules: {
            widgets: WidgetsModule
        },
    });


## Releasing a new version

Steps:

Bump version number in package.json

Run 

    ./node_modules/.bin/vue-cli-service build --target lib --name amoe-butterworth-widgets src/library-entry.ts

Now `npm publish`
