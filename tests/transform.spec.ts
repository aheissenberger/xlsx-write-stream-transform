import XLSXTransformStream from '../src/XLSXTransformStream'
import { Readable, PassThrough } from 'stream';
import { pipeline } from 'stream/promises'
import * as fs from 'fs'

describe('XLSXTransformStream', () => {
    xit('create simple xls', async () => {
        const inputStream = Readable.from([
            ['Text', 'Number', 'Number', 'True', 'False', 'Date'],
            ['test', 123, 99.123, true, false, new Date()]
        ]);
        const transform = new XLSXTransformStream();
        const outputStream = fs.createWriteStream('test.xlsx');
        
        await pipeline(
            inputStream,
            transform,
            outputStream
        )
    })
    it('create simple xls', async () => {
        const used = process.memoryUsage();
        for (let key in used) {
            console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
        }
        const inputStream = new Readable({ objectMode: true })
        const transform = new XLSXTransformStream();
        const outputStream = fs.createWriteStream('test.xlsx');
        outputStream.on('finish', function () {
            const used = process.memoryUsage();
            for (let key in used) {
                console.log(`finish: ${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
            }
        })

        const p = pipeline(
            inputStream,
            transform,
            outputStream
        )

        for (let index = 1; index <= 1_000; index++) {
            inputStream.push([index, 'Max', 'Mustermann', '+00112345345435', 1010, 'Vienna', 'Kärnerstr. 1', 300.55, true, false, new Date(), null, null, null, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'])
        }
        inputStream.push(null)

        await p;
    }, 100_000)
})