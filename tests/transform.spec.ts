import XLSXTransformStream from '../src/XLSXTransformStream'
import { Readable, PassThrough } from 'stream';
import * as fs from 'fs'

describe('XLSXTransformStream', () => {
    it('create simple xls', (done) => {
        const inputStream = Readable.from([
            ['Text','Number','Number','True','False','Date'],
            ['test', 123, 99.123,true,false,new Date()]
        ]);
        const transform = new XLSXTransformStream();
        const outputStream=fs.createWriteStream('test.xlsx');
        outputStream.on('finish', function () {
            done()
        })
        inputStream.pipe(transform).pipe(outputStream)
    })
    xit('create simple xls', (done) => {
        const inputStream = new Readable({ objectMode: true })
        const transform = new XLSXTransformStream();
        const outputStream=fs.createWriteStream('test.xlsx');
        outputStream.on('finish', function () {
            done()
        })
        inputStream.pipe(transform).pipe(outputStream)
        for (let index = 1; index <= 100_000; index++) {
            inputStream.push([index,'Max', 'Mustermann', '+00112345345435', 1010, 'Vienna', 'Kärnerstr. 1', 300.55, true, false, new Date(), null, null, null, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'])
        }
        inputStream.push(null)
    }, 100_000)
})