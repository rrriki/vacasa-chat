import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAttemptDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
