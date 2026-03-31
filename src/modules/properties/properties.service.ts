import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async findAll(): Promise<PropertyDocument[]> {
    return await this.propertyModel.find().exec();
  }

  async create(data: CreatePropertyDto): Promise<PropertyDocument> {
    const createdProperty = new this.propertyModel(data);
    return await createdProperty.save();
  }

  async delete(id: string): Promise<Boolean> {
    const result = await this.propertyModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}

export default PropertiesService;
