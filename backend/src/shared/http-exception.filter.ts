import {Catch, HttpException, ExceptionFilter, ArgumentsHost, Logger, HttpStatus} from '@nestjs/common';

/* https://docs.nestjs.com/exception-filters */

const logger = new Logger('HttpExceptionFilter');

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception.message.message || exception.message.error || exception.message;
        logger.warn(`HTTP Exception ${status} on route: ${request.method} "${request.url}": ${message}`);
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                method: request.method,
                path: request.url,
                message,
            });
    }

}
