# widgets3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


## Releasing a new version

Steps:

Bump version number in package.json

Run 

    vue-cli-service build --target lib --name amoe-butterworth-widgets src/library-entry.ts

Now `npm publish`
