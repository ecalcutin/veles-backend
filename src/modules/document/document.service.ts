import { Injectable } from '@nestjs/common';
import PizZip from 'pizzip';
import DocxTemplater from 'docxtemplater';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Readable } from 'stream';
import { Waybill } from '../transaction/interfaces';

@Injectable()
export class DocumentService {
  constructor() { }

  prepareWaybillDocument(data: Waybill): Readable {
    let content = readFileSync(
      resolve(process.cwd(), 'templates', 'waybillTemplate.docx'),
      'binary',
    );
    let zip = new PizZip(content);
    let doc = new DocxTemplater();
    doc.loadZip(zip);
    doc.setData({
      date: data.date
    });

    try {
      doc.render();
    } catch (err) {
      throw err;
    }
    let buff = doc.getZip().generate({ type: 'nodebuffer' });
    const stream = new Readable();
    stream.push(buff);
    stream.push(null);
    return stream;
  }
}
