import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherStackService } from './weatherStack.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherStackService],
  exports: [WeatherStackService],
})
export class WeatherStackModule {}
