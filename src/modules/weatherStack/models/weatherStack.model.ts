import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class WeatherStackAstroModel {
  @Field(() => String)
  sunrise: string;

  @Field(() => String)
  sunset: string;

  @Field(() => String)
  moonrise: string;

  @Field(() => String)
  moonset: string;

  @Field(() => String)
  moon_phase: string;

  @Field(() => Float)
  moon_illumination: number;
}

@ObjectType()
export class WeatherStackAirQualityModel {
  @Field(() => String)
  co: string;

  @Field(() => String)
  no2: string;

  @Field(() => String)
  o3: string;

  @Field(() => String)
  so2: string;

  @Field(() => String)
  pm2_5: string;

  @Field(() => String)
  pm10: string;

  @Field(() => Float, { name: 'us_epa_index' })
  'us-epa-index': number;

  @Field(() => Float, { name: 'gb_defra_index' })
  'gb-defra-index': number;
}

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

  @Field(() => WeatherStackAstroModel)
  astro: WeatherStackAstroModel;

  @Field(() => WeatherStackAirQualityModel)
  air_quality: WeatherStackAirQualityModel;

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
