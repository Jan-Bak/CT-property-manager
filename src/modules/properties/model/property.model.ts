import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class WeatherData {
  @Field(() => String)
  observation_time: string;

  @Field(() => Float)
  temperature: number;

  @Field(() => [String])
  weather_icons: string[];

  @Field(() => [String])
  weather_descriptions: string[];

  // @Field(() => WeatherStackCurrentAstro)
  // astro: WeatherStackCurrentAstro;

  // @Field(() => WeatherStackCurrentAirQuality)
  // air_quality: WeatherStackCurrentAirQuality;

  @Field(() => Float)
  wind_speed: number;

  @Field(() => Float)
  wind_degree: number;

  @Field(() => String)
  wind_dir: string;

  @Field(() => Float)
  pressure: number;

  @Field(() => Float)
  precip: number;

  @Field(() => Float)
  humidity: number;

  @Field(() => Float)
  cloudcover: number;

  @Field(() => Float)
  feelslike: number;

  @Field(() => Float)
  uv_index: number;

  @Field(() => Float)
  visibility: number;
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
