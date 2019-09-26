import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {Logger} from '@nestjs/common';
import {Configuration} from './configuration';
import {ValidationPipe} from './shared/validation.pipe';
import {HttpExceptionFilter} from './shared/http-exception.filter';
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
    const logger = new Logger('Main');
    const {port} = Configuration.getHttpServerConfig();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: '*',
        maxAge: 3600,
    });

    app.useStaticAssets(Configuration.getUploadDirectory());

    // Set up Swagger documentation
    const options = new DocumentBuilder()
        .setTitle('Vacasa Chat')
        .setDescription('API to interact with the platform.')
        .setVersion('1.0')
        .setContactEmail('ricardo.rincon@vacasa.com')
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
    // Add custom validations
    app.useGlobalPipes(new ValidationPipe());
    // Add custom HTTP exception handler
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(port);
    logger.log(`Server listening on port: ${port}`);
}

bootstrap();
