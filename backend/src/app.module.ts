import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArtworksModule } from './artworks/artworks.module';
import { WebsocketsModule } from './websockets/websockets.module';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        PrismaModule,
        ArtworksModule,
        WebsocketsModule,
    ],
})
export class AppModule {}
