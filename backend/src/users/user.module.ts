import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';

@Module({
    imports: [
        // TODO: ADD Imports for Mongoose User Schema, and Multer file handler
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}
