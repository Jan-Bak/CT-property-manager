import { ObjectType, Field, Float } from '@nestjs/graphql';
import { WeatherData } from 'src/modules/weatherStack/models/weatherStack.model';

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

  @Field(() => WeatherData)
  weatherData: WeatherData;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  long: number;

  @Field(() => Date)
  createdAt: Date;
}
