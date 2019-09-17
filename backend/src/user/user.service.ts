import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {User} from '../../../typing/user.interface';
import {CreateUserDto} from './create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async createUser(user: CreateUserDto): Promise<User> {
        const newUser = await new this.userModel(user);
        return newUser.save();

    }

    async findUserByEmail(email: string): Promise<any> {
        return await this.userModel.findOne({email});
    }
}
