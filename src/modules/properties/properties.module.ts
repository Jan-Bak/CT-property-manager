import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schemas/property.schema';
import { PropertiesService } from './properties.service';
import { PropertiesResolver } from './properties.resolver';
import { WeatherStackModule } from '../weatherStack/weatherStack.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ]),
    WeatherStackModule,
  ],
  providers: [PropertiesService, PropertiesResolver],
  exports: [PropertiesService],
})
export class PropertiesModule {}
