import { config } from '@/utils/config';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file')) // 拦截属性名为file的文件并上传
  upload(@UploadedFile() file: any) {
    // file 为上传的文件对象
    const url = `${config.server.host}:${config.server.port}/files/${file.filename}`;
    return url;
  }
}
