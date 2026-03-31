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

  async findAll(): Promise<PropertyDocument[]> {
    return await this.propertyModel.find().exec();
  }

  async findById(id: string): Promise<PropertyDocument | null> {
    return await this.propertyModel.findById(id).exec();
  }

  //Maybe filters should be avaiable to findAll method instead of creating new one?
  //TODO: Add lat and long
  async findByFilters(
    city?: string,
    state?: string,
    zipCode?: string,
  ): Promise<PropertyDocument[]> {
    const filters: Record<string, any> = {};
    if (city) filters.city = city;
    if (state) filters.state = state;
    if (zipCode) filters.zipCode = zipCode;

    return await this.propertyModel.find(filters).exec();
  }

  async create(data: CreatePropertyDto): Promise<PropertyDocument> {
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
  }

  async delete(id: string): Promise<Boolean> {
    const result = await this.propertyModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}

export default PropertiesService;
