import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyModel } from './models/property.model';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { SortOrder } from './enums/sort-order.enum';

@Resolver(() => PropertyModel)
export class PropertiesResolver {
  constructor(private propertiesService: PropertiesService) {}

  @Query(() => [PropertyModel])
  async properties(
    @Args('city', { nullable: true }) city?: string,
    @Args('state', { nullable: true }) state?: string,
    @Args('zipCode', { nullable: true }) zipCode?: string,
    @Args('sortBy', { nullable: true, type: () => SortOrder })
    sortBy?: SortOrder,
  ): Promise<PropertyModel[]> {
    if (city || state || zipCode || sortBy) {
      return this.propertiesService.findWithFilters(
        city,
        state,
        zipCode,
        sortBy,
      );
    }

    return this.propertiesService.findAll();
  }

  @Mutation(() => PropertyModel)
  async createProperty(
    @Args('input')
    input: CreatePropertyDto,
  ): Promise<PropertyModel> {
    return this.propertiesService.create(input);
  }

  @Mutation(() => Boolean)
  async deleteProperty(@Args('id') id: string): Promise<Boolean> {
    return this.propertiesService.delete(id);
  }
}
