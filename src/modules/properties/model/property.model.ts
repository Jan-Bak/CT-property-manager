import { ObjectType, Field, Float } from '@nestjs/graphql';
import { WeatherData } from 'src/modules/weatherStack/weatherStack.model';

@ObjectType()
export class PropertyModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  street: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => WeatherData, { nullable: true })
  weatherData?: WeatherData;

  @Field(() => Float, { nullable: true })
  lat?: number;

  @Field(() => Float, { nullable: true })
  long?: number;
}
