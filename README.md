# XLSX Excel Write Stream Transformer

High perfomance Excel XLSX creation as a replacement for existing CSV exports.  There are no options to format, style or style the output.

Based on the ZIP archive format, streaming will not start before all records have been processed! Expect a much higher memory consumption compared to CSV exports.

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
import XLSXTransformer from 'xlsx-write-stream-transform'
```
_Package provides TypeScript types_

**UMD**

```Javascript
var XLSXTransformer = require('xlsx-write-stream-transform')
```

## Example

```Javascript
import XLSXTransformer from 'xlsx-write-stream-transform'
import { Readable } from 'stream';
import * as fs from 'fs'

async function main() {
    return new Promise((resolve) => {
        const inputStream = new Readable({ objectMode: true })
        const transform = new XLSXTransform();
        const outputStream = fs.createWriteStream('test.xlsx');

        outputStream.on('finish', function () {
            resolve()
        })
        
        inputStream.pipe(transform).pipe(outputStream)

        for (let index = 1; index <= 1000; index++) {
            inputStream.push([index, 'Text', 99.99, true, new Date()])
        }
        inputStream.push(null)
    })
}

await main()
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