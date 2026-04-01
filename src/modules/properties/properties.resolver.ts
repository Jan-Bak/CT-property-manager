import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyModel } from './model/property.model';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Resolver(() => PropertyModel)
export class PropertiesResolver {
  constructor(private propertiesService: PropertiesService) {}

  @Query(() => [PropertyModel])
  async properties(
    @Args('city', { nullable: true }) city?: string,
    @Args('state', { nullable: true }) state?: string,
    @Args('zipCode', { nullable: true }) zipCode?: string,
    @Args('sortBy', { nullable: true }) sortBy?: 'desc' | 'asc', //TODO: enum?  | its sorted by createdAt field
  ): Promise<PropertyModel[]> {
    return this.propertiesService.findAll(city, state, zipCode, sortBy);
  }

  @Mutation(() => PropertyModel)
  async createProperty(
    @Args('input')
    input: CreatePropertyDto,
  ): Promise<PropertyModel> {
    //TODO: request to weather api
    return this.propertiesService.create(input);
  }

  @Mutation(() => Boolean)
  async deleteProperty(@Args('id') id: string): Promise<Boolean> {
    return this.propertiesService.delete(id);
  }
}
