import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { File } from './files.model';

@Injectable()
export class FileService {
  constructor(@InjectModel('File') private readonly fileModel: Model<File>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async insertFile(file: any) {
    return file;
  }
}