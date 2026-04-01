import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { WeatherStackService } from '../weatherStack/weatherStack.service';
import { SortOrder } from './enums/sort-order.enum';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    private readonly weatherStackService: WeatherStackService,
  ) {}

  async findAll(): Promise<PropertyDocument[]> {
    return await this.propertyModel.find().exec();
  }

  async findWithFilters(
    city?: string,
    state?: string,
    zipCode?: string,
    lat?: number,
    long?: number,
    sortBy: SortOrder = SortOrder.DESC,
  ): Promise<PropertyDocument[]> {
    const filters = Object.fromEntries(
      Object.entries({ city, state, zipCode, lat, long }).filter(
        ([, value]) => value !== undefined,
      ),
    ) as Record<string, string | number>;

    return await this.propertyModel
      .find(filters)
      .sort({ createdAt: sortBy === SortOrder.ASC ? 1 : -1 })
      .exec();
  }

  async findById(id: string): Promise<PropertyDocument | null> {
    return await this.propertyModel.findById(id).exec();
  }

  async create(data: CreatePropertyDto): Promise<PropertyDocument> {
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
