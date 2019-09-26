import {IsEmail, IsNotEmpty} from 'class-validator';

export class FindByEmailDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
