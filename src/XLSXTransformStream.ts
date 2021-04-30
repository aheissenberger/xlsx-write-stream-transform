import archiver, { Archiver }  from 'archiver';
import { PassThrough, Transform } from 'stream';
import * as templates from './templates';

/** Class representing a XLSX Transform Stream */
export default class XLSXTransformStream extends Transform {
    private zip: Archiver
    private sheetStream: PassThrough
    private rowCount = 0;
    private fini
    /**
     * Create a new Stream
     */
    constructor() {
        super({ objectMode: true });

        this.sheetStream = new PassThrough();
        this.initializeArchiver();
        this.sheetStream.write(templates.SheetHeader);
    }

    initializeArchiver() {
        this.zip = archiver('zip', {
            //zlib: { level: 9 }
        });

        this.zip.on('data', (data) => {
            this.push(data);
        });

        this.zip.append(templates.ContentTypes, {
            name: '[Content_Types].xml',
        });

        this.zip.append(templates.Rels, {
            name: '_rels/.rels',
        });

        this.zip.append(templates.Workbook, {
            name: 'xl/workbook.xml',
        });

        this.zip.append(templates.Styles, {
            name: 'xl/styles.xml',
        });

        this.zip.append(templates.WorkbookRels, {
            name: 'xl/_rels/workbook.xml.rels',
        });

        this.zip.on('warning', (err) => {
            console.warn(err);
        });

        this.zip.on('error', (err) => {
            console.error(err);
        });

        this.zip.append(this.sheetStream, {
            name: 'xl/worksheets/sheet1.xml',
        });
        
        this.fini=this.zip.finalize()
    }

     _transform(row, encoding, callback) {
        const xlsxRow=templates.Row(this.rowCount, row);
        const writeStatus =this.sheetStream.write(xlsxRow)
        if (!writeStatus) {
            this.sheetStream.once('drain',callback)
        } else {
            this.rowCount++
            process.nextTick(callback);
        }
    }

    async _flush(callback) {
        this.sheetStream.end(templates.SheetFooter);
        await this.fini;
        callback();
    }
}
