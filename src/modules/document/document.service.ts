import { Injectable } from '@nestjs/common';
import PizZip from 'pizzip';
import DocxTemplater from 'docxtemplater';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class DocumentService {
  constructor() {}

  async prepareWaybillDocument() {
    let content = readFileSync(resolve(__dirname, 'input.docx'), 'binary');

    let zip = new PizZip(content);
    let doc = new DocxTemplater();
    doc.loadZip(zip);

    doc.setData({});

    try {
    } catch (err) {}

    let buff = doc.getZip().generate({ type: 'nodebuffer' });
    writeFileSync(resolve(__dirname, 'output.docx'), buff);
  }
}
