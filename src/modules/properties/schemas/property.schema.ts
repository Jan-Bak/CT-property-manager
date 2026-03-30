import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

export class Property {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true, length: 2 })
  state: string;

  @Prop({ required: true, length: 5, match: /^\d{5}$/ })
  zipCode: string;

  @Prop({ required: true, type: Object })
  weatherData: Record<string, any>;

  @Prop({ required: true, type: Number })
  lat: number;

  @Prop({ required: true, type: Number })
  long: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
