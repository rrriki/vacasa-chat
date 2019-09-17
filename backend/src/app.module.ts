import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {ChatModule} from './chat/chat.module';
import {UserModule} from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import {Configuration} from './configuration';

const mongoConfig = Configuration.getMongoConfig();

@Module({
    imports: [
        AuthModule,
        ChatModule,
        UserModule,
        MongooseModule.forRoot(mongoConfig.uri, mongoConfig.options),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
