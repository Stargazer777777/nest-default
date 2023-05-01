import { ResponseStructure } from '@/declare/common';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    // const next = ctx.getNext<NextFunction>();

    const status = exception.getStatus();
    const excepRes = exception.getResponse();
    const preparedData: ResponseStructure = {
      message: '错误',
      statusCode: status,
      success: false,
    };
    if (excepRes instanceof Object) {
      if ((excepRes as any).message instanceof Array) {
        (excepRes as any).message = (excepRes as any).message.join('; ');
      }
      preparedData.message = (excepRes as any).message;
    } else {
      preparedData.message = excepRes;
    }

    res.status(200).json(preparedData); // 只传必要信息
  }
}
