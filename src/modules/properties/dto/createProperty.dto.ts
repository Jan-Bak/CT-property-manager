import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Matches,
} from 'class-validator';

@InputType()
export class CreatePropertyDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  street: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state: string;

  @Field(() => String)
  @IsNumberString()
  @IsNotEmpty()
  @Matches(/^\d{5}$/, {
    message: 'Zip code must be a 5-digit number',
  })
  zipCode: string;
}
