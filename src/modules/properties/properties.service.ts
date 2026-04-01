import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { WeatherStackService } from '../weatherStack/weatherStack.service';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    private readonly weatherStackService: WeatherStackService,
  ) {}

  async findAll(
    city?: string,
    state?: string,
    zipCode?: string,
    sortBy?: 'desc' | 'asc',
  ): Promise<PropertyDocument[]> {
    const filters: Record<string, any> = {};
    if (city) filters.city = city;
    if (state) filters.state = state;
    if (zipCode) filters.zipCode = zipCode;

    let query = this.propertyModel.find(filters);

    if (sortBy) {
      const sortOrder = sortBy === 'asc' ? 1 : -1;
      query = query.sort({ createdAt: sortOrder });
    }

    return await query.exec();
  }

  async findById(id: string): Promise<PropertyDocument | null> {
    return await this.propertyModel.findById(id).exec();
  }

  async create(data: CreatePropertyDto): Promise<PropertyDocument> {
    // rethink this if i should put this call here instead of in resolver

    try {
      const weatherData = await this.weatherStackService.findWeatherData(
        data.city,
        data.state,
        data.zipCode,
      );

      const propertyData = {
        ...data,
        weatherData: weatherData.current,
        lat: parseFloat(weatherData.lat),
        long: parseFloat(weatherData.long),
      };

      const createdProperty = new this.propertyModel(propertyData);

      return await createdProperty.save();
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'An unknown error occurred while fetching weather data',
      );
    }
  }

  async delete(id: string): Promise<Boolean> {
    const result = await this.propertyModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}

export default PropertiesService;
