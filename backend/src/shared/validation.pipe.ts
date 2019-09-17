import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';
import {validate} from 'class-validator';
import {plainToClass} from 'class-transformer';
import * as _ from 'lodash';

/* https://docs.nestjs.com/pipes */

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value, {metatype}: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {

            let failedConstraints = [];

            _.forEach(errors, (error) => {
                const {constraints} = error;
                failedConstraints = _.concat(failedConstraints, _.values(constraints));
            });

            throw new BadRequestException(failedConstraints, 'Validation Failed');
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
