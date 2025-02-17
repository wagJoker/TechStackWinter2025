"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtworksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const websockets_gateway_1 = require("../websockets/websockets.gateway");
let ArtworksService = class ArtworksService {
    constructor(prisma, websocketsGateway) {
        this.prisma = prisma;
        this.websocketsGateway = websocketsGateway;
    }
    async findAll(params) {
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
    async findOne(id) {
        const artwork = await this.prisma.artwork.findUnique({ where: { id } });
        if (!artwork) {
            throw new common_1.NotFoundException(`Artwork with id ${id} not found`);
        }
        return { ...artwork, imageUrl: artwork.imageUrl || '' };
    }
    async create(data) {
        const artwork = await this.prisma.artwork.create({ data });
        const normalizedArtwork = { ...artwork, imageUrl: artwork.imageUrl || '' };
        this.websocketsGateway.server.emit('artworkCreated', normalizedArtwork);
        return {
            message: 'Artwork successfully created',
            artwork: normalizedArtwork,
        };
    }
    async update(id, data) {
        const artwork = await this.prisma.artwork.update({ where: { id }, data });
        const normalizedArtwork = { ...artwork, imageUrl: artwork.imageUrl || '' };
        this.websocketsGateway.server.emit('artworkUpdated', normalizedArtwork);
        return normalizedArtwork;
    }
    async delete(id) {
        const artwork = await this.prisma.artwork.delete({ where: { id } });
        this.websocketsGateway.server.emit('artworkDeleted', id);
        return { ...artwork, imageUrl: artwork.imageUrl || '' };
    }
};
exports.ArtworksService = ArtworksService;
exports.ArtworksService = ArtworksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        websockets_gateway_1.WebsocketsGateway])
], ArtworksService);
