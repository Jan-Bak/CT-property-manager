import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WeatherStackResponse } from './weatherStack.type';
import { firstValueFrom, Observable } from 'rxjs';
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
    current: WeatherStackResponse['current'];
    lat: string;
    long: string;
  }> {
    const query = `${city},${state},${zipCode}`;

    const url = new URL(this.apiUrl);
    url.searchParams.append('access_key', this.apiKey);
    url.searchParams.append('query', query);

    const response = await firstValueFrom(
      this.httpService.get<WeatherStackResponse>(this.apiUrl, {
        params: {
          access_key: this.apiKey,
          query: query,
        },
      }),
    ).catch((error) => {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    });

    const { current, location } = response.data;
    const { lat, lon: long } = location;

    return { current, lat, long };
  }
}
