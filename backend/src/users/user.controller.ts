import {
    Controller,
    Get,
    Response,
    HttpStatus,
    Param, HttpException,
} from '@nestjs/common';
import {ApiResponse} from '@nestjs/swagger';
import {ApiUseTags} from '@nestjs/swagger';
import * as _ from 'lodash';

import {UserService} from './user.service';

import {FindByEmailDto} from './find-by-email.dto';

@ApiUseTags('Users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    // TODO: Add controller route too handle createUser POST

    @Get(':email')
    @ApiResponse({status: HttpStatus.OK, description: 'User fetched successfully'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error fetching users'})
    async findUserByEmail(@Response() res, @Param() params: FindByEmailDto) {
        try {
            const user = await this.userService.findUserByEmail(params.email);
            if (_.isNil(user)) {
                return res.status(HttpStatus.NOT_FOUND).json({message: 'User not found'});
            }
            return res.status(HttpStatus.OK).json(user);
        } catch (e) {
            throw new HttpException(e.message, e.code);
        }
    }
}
