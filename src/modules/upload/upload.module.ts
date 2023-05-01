// /upload/upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [
    // 注册上传模块
    MulterModule.register({
      storage: diskStorage({
        // 存放到本地
        destination: join(process.cwd(), './files'), // 存放路径
        filename: (req, file, callback) => {
          // 动态创建文件名
          const fileName = `${new Date().getTime()}${extname(
            file.originalname,
          )}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
