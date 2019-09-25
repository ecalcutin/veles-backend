import { Injectable } from '@nestjs/common';
import PizZip from 'pizzip';
import DocxTemplater from 'docxtemplater';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { Readable } from 'stream';
import moment from 'moment';

import { Waybill } from '../transaction/interfaces';

@Injectable()
export class DocumentService {
  constructor() {}

  prepareWaybillDocument(data: Waybill): Readable {
    let content = readFileSync(
      resolve(process.cwd(), 'templates', 'waybillTemplate.docx'),
      'binary',
    );
    let zip = new PizZip(content);
    let doc = new DocxTemplater();
    doc.loadZip(zip);
    doc.setData({
      date: moment(data.date)
        .locale('ru')
        .format('от «DD» MMMM YYYY г.'),
      destination: data._destination ? data._destination.title : '',
      source: data._source ? data._source.title : '',
      products: data.products.map((item, index) => ({
        index: index + 1,
        title: item.title,
        category: item.category,
        unit: item.unit,
        price_retail: item.price_retail,
        quantity: item.quantity,
        retailSumm: item.price_retail * item.quantity,
      })),
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
