import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class WeatherData {
  @Field(() => Float)
  temperature?: number;
  //TODO: Added one field only to avoid schema generation errors
}

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
