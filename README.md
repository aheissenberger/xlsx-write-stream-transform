# XLSX Excel Write Stream Transformer

High perfomance streaming Excel XLSX creation as a replacement for existing CSV exports.  There are no options to format or style the output.

This library is no replacement for [exceljs](https://www.npmjs.com/package/exceljs).

This project is based on the existing library [xlsx-write-stream](https://github.com/apify/xlsx-stream)

## Installation

**npm**

```sh
npm install xlsx-write-stream-transform
```

**Yarn**

```sh
yarn add xlsx-write-stream-transform
```

## Usage

**ES Modules / ES6 / Typescript**

```Javascript
import {XLSXTransform} from 'xlsx-write-stream-transform'
```
_Package provides TypeScript types_

**UMD**

```Javascript
const {XLSXTransform} = require('xlsx-write-stream-transform')
```

## Example

**index.mjs (Node.js >= 14.8)**
```Javascript
import { XLSXTransform } from 'xlsx-write-stream-transform'
import { Readable } from 'stream';
import { pipeline } from 'stream/promises'
import * as fs from 'fs'

const inputStream = new Readable({ objectMode: true })
const transform = new XLSXTransform();
const outputStream = fs.createWriteStream('test.xlsx');

const p = pipeline(
    inputStream,
    transform,
    outputStream
)

const nowDate=new Date();
inputStream.push(['Index', 'Text', 'Number', 'Boolean', 'Date'])
for (let index = 1; index <= 1000; index++) {
    inputStream.push([index, 'Text', 99.99, true, nowDate])
}
inputStream.push(null)

await p
```

### Contribution

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
1. Create your Feature Branch (git checkout -b feature/AmazingFeature)
1. Commit your Changes (git commit -m 'Add some AmazingFeature')
1. Push to the Branch (git push origin feature/AmazingFeature)
1. Open a Pull Request

### Built With

- [microbundle](https://github.com/developit/microbundle)

### License

Distributed under the "bsd-2-clause" License. See [LICENSE.txt](LICENSE.txt) for more information.