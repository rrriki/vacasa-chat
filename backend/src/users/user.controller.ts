import {
    Controller,
    Body,
    Post,
    Get,
    Response,
    HttpStatus,
    Param, HttpException, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import {ApiResponse} from '@nestjs/swagger';
import {ApiUseTags} from '@nestjs/swagger';
import * as _ from 'lodash';

import {UserService} from './user.service';

import {CreateUserDto} from './create-user.dto';
import {FindByEmailDto} from './find-by-email.dto';
import {FileInterceptor} from "@nestjs/platform-express";

@ApiUseTags('Users')
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    @ApiResponse({status: HttpStatus.OK, description: 'User created successfully'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error creating users'})
    @UseInterceptors(FileInterceptor('profilePhoto'))
    async createUser(@Response() res, @Body() user: CreateUserDto, @UploadedFile() profilePhoto) {
        try {
            const newUser = await this.userService.createUser(user, profilePhoto);
            return res.status(HttpStatus.OK).json(newUser);
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException('User already exists', HttpStatus.CONFLICT);
            }
            throw new HttpException(e.message, e.code);
        }
    }

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
