import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './user.schema';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {MulterModule} from '@nestjs/platform-express';
import * as multer from 'multer';
import {Configuration} from '../configuration';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        MulterModule.register({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, Configuration.getUploadDirectory());
                },
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}_${file.originalname}`);
                },
            }),
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}
