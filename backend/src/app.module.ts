import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './users/user.module';
import {MongooseModule} from '@nestjs/mongoose';
import {Configuration} from './configuration';

const mongoConfig = Configuration.getMongoConfig();

@Module({
    imports: [
        AuthModule,
        UserModule,
        MongooseModule.forRoot(mongoConfig.uri, mongoConfig.options),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
