import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface Message {
  message: string[];
  error: string;
  statusCode: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('==================== Masuk Error ====================');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const getMessage = exception.getResponse() as string | Message;
    const message =
      typeof getMessage === 'string' ? getMessage : getMessage.message[0];

    response.status(status).json({
      statusCode: status,
      messsage: message,
      path: request.url,
    });
  }
}
