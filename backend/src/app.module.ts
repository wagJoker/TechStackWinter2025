import { Module } from '@nestjs/common';
import { GalleriesModule } from './galleries/galleries.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [GalleriesModule, ArtistsModule],
})
export class AppModule {}