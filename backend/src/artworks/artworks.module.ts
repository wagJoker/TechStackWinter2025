import { Module } from '@nestjs/common';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { WebsocketsModule } from 'src/websockets/websockets.module';

@Module({
    imports: [WebsocketsModule],
    controllers: [ArtworksController],
    providers: [ArtworksService],
})
export class ArtworksModule {}
