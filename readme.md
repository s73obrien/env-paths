# env-paths-ts [![Build Status](https://travis-ci.org/s73obrien/env-paths-ts.svg?branch=master)](https://travis-ci.org/s73obrien/env-paths-ts)

> Get paths for storing things like data, config, cache, etc

*This is a re-write of [env-paths](https://github.com/sindresorhus/env-paths) for use in Typescript.  It can also be used as a drop-in replacement for [env-paths](https://github.com/sindresorhus/env-paths)*

Uses the correct OS-specific paths. Most developers get this wrong.


## Install

```
$ npm install --save env-paths-ts
```


## Usage

```js
const envPaths = require('env-paths-ts');
const paths = envPaths('MyApp');

paths.data;
//=> '/home/sindresorhus/.local/share/MyApp-nodejs'

paths.config
//=> '/home/sindresorhus/.config/MyApp-nodejs'
```


## API

### paths = envPaths(name, [options])

#### name

Type: `string`

Name of your project. Used to generate the paths.

#### options

##### suffix

Type: `string`<br>
Default: `'nodejs'`

**Don't use this option unless you really have to!**<br>
Suffix appended to the project name to avoid name conflicts with native
apps. Pass an empty string to disable it.

### paths.data

Directory for data files.

### paths.config

Directory for config files.

### paths.cache

Directory for non-essential data files.

### paths.log

Directory for log files.

### paths.temp

Directory for temporary files.


## License

MIT © Sean O'Brien
