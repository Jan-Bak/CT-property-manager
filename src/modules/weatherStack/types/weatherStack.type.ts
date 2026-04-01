// based on https://docs.apilayer.com/weatherstack/docs/weatherstack-api-v-1-0-0?utm_source=dashboard&utm_medium=Referral#/default/getCurrentWeather

export type WeatherStackRequest = {
  type: string;
  query: string;
  language: string;
  unit: string;
};

export type WeatherStackLocation = {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
};

export type WeatherStackCurrentAstro = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
};

export type WeatherStackCurrentAirQuality = {
  co: string;
  no2: string;
  o3: string;
  so2: string;
  pm2_5: string;
  pm10: string;
  'us-epa-index': number;
  'gb-defra-index': number;
};

export type WeatherStackCurrent = {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  astro: WeatherStackCurrentAstro;
  air_quality: WeatherStackCurrentAirQuality;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
};

export interface WeatherStackResponse {
  request: WeatherStackRequest;
  location: WeatherStackLocation;
  current: WeatherStackCurrent;
}

export interface WeatherStackErrorResponse {
  success: boolean;
  error: {
    code: number;
    type: string;
    info: string;
  };
}
