import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  UploadedFiles,
  UseInterceptors,
  Param,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './files.service';

@Controller('upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async uploadFile(@UploadedFiles() file, @Body('name') name: string) {
    console.log(name);
  const fileUploaded = await this.fileService.insertFile(file);
    console.log(fileUploaded.filename);
  }

  @Get(':path')
  seeFile(@Param('path') image, @Res() res) {
    return res.sendFile(image, { root: 'files' });
  }
}
