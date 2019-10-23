import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { FileController } from './files.controller';
import { FileService } from './files.service';
import { FileSchema } from './files.model';

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './files');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }]),
    MulterModule.register({
      storage: storage
      // dest: './files',
    })
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}