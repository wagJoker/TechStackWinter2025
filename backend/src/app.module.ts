import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArtworksModule } from './artworks/artworks.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadController } from './upload/upload.controller';
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
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
    ],
    controllers: [UploadController],
    providers: [],
})
export class AppModule {}