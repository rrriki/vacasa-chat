import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiModelProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;
}
