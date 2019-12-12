import {Injectable} from '@nestjs/common';

@Injectable()
export class UserService {

    // TODO: Inject the UserModel using the @InjectModel decorator from Mongoose

    // TODO: Implement a createUser method

    async findUserByEmail(email: string): Promise<any> {
        return await this.userModel.findOne({email});
    }
}
