import { Module } from '@nestjs/common';
import { GalleriesController } from './galleries.controller';
import { GalleriesService } from './galleries.service';

@Module({
  controllers: [GalleriesController],
  providers: [GalleriesService],
})
export class GalleriesModule {}