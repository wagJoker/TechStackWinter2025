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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtworksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const artworks_service_1 = require("./artworks.service");
const artwork_dto_1 = require("./dto/artwork.dto");
const artwork_entity_1 = require("./entities/artwork.entity");
let ArtworksController = class ArtworksController {
    constructor(artworksService) {
        this.artworksService = artworksService;
    }
    async getAllArtworks(price, artist, type, search) {
        return this.artworksService.findAll({ price, artist, type, search });
    }
    async getArtwork(id) {
        return this.artworksService.findOne(id);
    }
    async createArtwork(createArtworkDto) {
        try {
            return await this.artworksService.create(createArtworkDto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            else {
                throw new common_1.BadRequestException('Unknown error occurred');
            }
        }
    }
    async updateArtwork(id, updateArtworkDto) {
        try {
            return await this.artworksService.update(id, updateArtworkDto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            else {
                throw new common_1.BadRequestException('Unknown error occurred');
            }
        }
    }
    async deleteArtwork(id) {
        return this.artworksService.delete(id);
    }
};
exports.ArtworksController = ArtworksController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all artworks' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of artworks', type: [artwork_entity_1.Artwork] }),
    (0, swagger_1.ApiQuery)({ name: 'price', required: false, enum: ['asc', 'desc'] }),
    (0, swagger_1.ApiQuery)({ name: 'artist', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['painting', 'sculpture', 'photography', 'digital', 'mixed_media'] }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    __param(0, (0, common_1.Query)('price')),
    __param(1, (0, common_1.Query)('artist')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ArtworksController.prototype, "getAllArtworks", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific artwork' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Artwork details', type: artwork_entity_1.Artwork }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtworksController.prototype, "getArtwork", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new artwork' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Artwork created', type: artwork_dto_1.ArtworkResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_dto_1.CreateArtworkDto]),
    __metadata("design:returntype", Promise)
], ArtworksController.prototype, "createArtwork", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing artwork' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Artwork updated', type: artwork_entity_1.Artwork }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, artwork_dto_1.UpdateArtworkDto]),
    __metadata("design:returntype", Promise)
], ArtworksController.prototype, "updateArtwork", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an artwork' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Artwork deleted', type: artwork_entity_1.Artwork }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtworksController.prototype, "deleteArtwork", null);
exports.ArtworksController = ArtworksController = __decorate([
    (0, swagger_1.ApiTags)('Artworks'),
    (0, common_1.Controller)('artworks'),
    __metadata("design:paramtypes", [artworks_service_1.ArtworksService])
], ArtworksController);
