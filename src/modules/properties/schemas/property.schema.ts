import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { type WeatherStackCurrent } from 'src/modules/weatherStack/types/weatherStack.type';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true, length: 2 })
  state: string;

  @Prop({ required: true, length: 5, match: /^\d{5}$/ })
  zipCode: string;

  @Prop({ type: Object })
  weatherData: WeatherStackCurrent;

  @Prop({ type: Number })
  lat: number;

  @Prop({ type: Number })
  long: number;

  @Prop({ type: Date })
  createdAt: Date;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
