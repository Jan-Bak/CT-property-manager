import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  WeatherStackCurrent,
  WeatherStackErrorResponse,
  WeatherStackResponse,
} from './weatherStack.type';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherStackService {
  private readonly apiKey: string;
  private readonly apiUrl: string = 'http://api.weatherstack.com/current';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('WEATHERSTACK_API_KEY');
    if (!apiKey) {
      throw new Error(
        'WEATHERSTACK_API_KEY is not defined in environment variables',
      );
    }
    this.apiKey = apiKey;
  }

  async findWeatherData(
    city: string,
    state: string,
    zipCode: string,
  ): Promise<{
    current: WeatherStackCurrent;
    lat: string;
    long: string;
  }> {
    const query = `${city},${state},${zipCode}`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<WeatherStackResponse | WeatherStackErrorResponse>(
          this.apiUrl,
          {
            params: {
              access_key: this.apiKey,
              query: query,
            },
          },
        ),
      );

      if ('error' in data) {
        const { error } = data;
        throw new Error(
          `WeatherStack API Error (${error.code}): ${error.type} - ${error.info}`,
        );
      }

      const { current, location } = data;
      const { lat, lon: long } = location;

      return { current, lat, long };
    } catch (error) {
      throw error;
    }
  }
}
