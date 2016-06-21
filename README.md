# Graphyte Console

Administrative portal for managing Graphyte platforms and
schema entries.

## Getting Started

### Installation
```bash
npm install
```

### Running the development server

```bash
npm run watch
```

>Note: The server requires the [admin API](https://github.com/FlexSites/Graphyte-Console-API)
to be running. Check the documentation for running each independently or
use this [foreman](https://www.npmjs.com/package/foreman) script:

```
mongo: mongod --dbpath tmp/db
admin: cd admin && npm run watch
api: cd api && npm run watch
console: cd console && npm run watch
```

## Contributing

Please conform the the style guide denoted by the [.eslint](https://github.com/FlexSites/Graphyte-Console/blob/master/.eslintrc)




