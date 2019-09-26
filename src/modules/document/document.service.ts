import { Injectable } from '@nestjs/common';
import PizZip from 'pizzip';
import DocxTemplater from 'docxtemplater';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Readable } from 'stream';
import moment from 'moment';

@Injectable()
export class DocumentService {
  constructor() {}

  prepareWaybillDocument(data: any): Readable {
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
      waybill_id: data._id.waybill_id,
      destination: data._id.stock.title,
      products: data.items.map((item, index) => ({
        index: index + 1,
        title: item.product.title,
        category: item.category.title,
        unit: item.category.unit,
        price: item.price,
        quantity: Math.abs(item.quantity),
        summ: Math.abs(item.price * item.quantity),
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
