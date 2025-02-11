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
exports.ArtworkResponseDto = exports.UpdateArtworkDto = exports.CreateArtworkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const artwork_entity_1 = require("../entities/artwork.entity");
class CreateArtworkDto {
}
exports.CreateArtworkDto = CreateArtworkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 99 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(99),
    __metadata("design:type", String)
], CreateArtworkDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 50 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateArtworkDto.prototype, "artist", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['painting', 'sculpture', 'photography', 'digital', 'mixed_media'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['painting', 'sculpture', 'photography', 'digital', 'mixed_media']),
    __metadata("design:type", String)
], CreateArtworkDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateArtworkDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateArtworkDto.prototype, "availability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateArtworkDto.prototype, "imageUrl", void 0);
class UpdateArtworkDto {
}
exports.UpdateArtworkDto = UpdateArtworkDto;
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 99 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(99),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArtworkDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 50 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArtworkDto.prototype, "artist", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['painting', 'sculpture', 'photography', 'digital', 'mixed_media'], required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['painting', 'sculpture', 'photography', 'digital', 'mixed_media']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArtworkDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateArtworkDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateArtworkDto.prototype, "availability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateArtworkDto.prototype, "imageUrl", void 0);
class ArtworkResponseDto {
}
exports.ArtworkResponseDto = ArtworkResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Artwork successfully created' }),
    __metadata("design:type", String)
], ArtworkResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => artwork_entity_1.Artwork }),
    __metadata("design:type", artwork_entity_1.Artwork)
], ArtworkResponseDto.prototype, "artwork", void 0);
