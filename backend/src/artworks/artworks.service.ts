import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtworkDto, UpdateArtworkDto, ArtworkResponseDto } from './dto/artwork.dto';
import { Artwork } from './entities/artwork.entity';
import { WebsocketsGateway } from '../websockets/websockets.gateway';

@Injectable()
export class ArtworksService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly websocketsGateway: WebsocketsGateway
    ) {}

    async findAll(params: { price?: 'asc' | 'desc'; artist?: string; type?: string; search?: string }): Promise<Artwork[]> {
        const { price, artist, type, search } = params;
        const artworks = await this.prisma.artwork.findMany({
            where: {
                ...(artist && { artist: { contains: artist } }),
                ...(type && { type }),
                ...(search && {
                    OR: [
                        { title: { contains: search } },
                        { artist: { contains: search } },
                    ],
                }),
            },
            orderBy: {
                ...(price && { price: price }),
            },
        });
        // Нормализация поля imageUrl
        return artworks.map(a => ({ ...a, imageUrl: a.imageUrl || '' }));
    }

    async findOne(id: string): Promise<Artwork> {
        const artwork = await this.prisma.artwork.findUnique({ where: { id } });
        if (!artwork) {
            throw new NotFoundException(`Artwork with id ${id} not found`);
        }
        return { ...artwork, imageUrl: artwork.imageUrl || '' };
    }

    async create(data: CreateArtworkDto): Promise<ArtworkResponseDto> {
        const artwork = await this.prisma.artwork.create({ data });
        const normalizedArtwork = { ...artwork, imageUrl: artwork.imageUrl || '' };
        this.websocketsGateway.server.emit('artworkCreated', normalizedArtwork);
        return {
            message: 'Artwork successfully created',
            artwork: normalizedArtwork,
        };
    }

    async update(id: string, data: UpdateArtworkDto): Promise<Artwork> {
        const artwork = await this.prisma.artwork.update({ where: { id }, data });
        const normalizedArtwork = { ...artwork, imageUrl: artwork.imageUrl || '' };
        this.websocketsGateway.server.emit('artworkUpdated', normalizedArtwork);
        return normalizedArtwork;
    }

    async delete(id: string): Promise<Artwork> {
        const artwork = await this.prisma.artwork.delete({ where: { id } });
        this.websocketsGateway.server.emit('artworkDeleted', id);
        return { ...artwork, imageUrl: artwork.imageUrl || '' };
    }
}
