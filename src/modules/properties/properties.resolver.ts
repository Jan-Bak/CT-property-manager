import { Query, Resolver } from '@nestjs/graphql';
import { PropertyModel } from './model/property.model';
import { PropertiesService } from './properties.service';

@Resolver(() => PropertyModel)
export class PropertiesResolver {
  constructor(private propertiesService: PropertiesService) {}

  @Query(() => [PropertyModel])
  async properties(): Promise<PropertyModel[]> {
    return this.propertiesService.findAll();
  }
}
