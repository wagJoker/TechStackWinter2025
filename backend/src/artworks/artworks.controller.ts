import { Controller, Get, Post, Put, Delete, Param, Body, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ArtworksService } from './artworks.service';
import { CreateArtworkDto, UpdateArtworkDto, ArtworkResponseDto } from './dto/artwork.dto';
import { Artwork } from './entities/artwork.entity';

@ApiTags('Artworks')
@Controller('artworks')
export class ArtworksController {
    constructor(private readonly artworksService: ArtworksService) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve all artworks' })
    @ApiResponse({ status: 200, description: 'List of artworks', type: [Artwork] })
    @ApiQuery({ name: 'price', required: false, enum: ['asc', 'desc'] })
    @ApiQuery({ name: 'artist', required: false })
    @ApiQuery({ name: 'type', required: false, enum: ['painting', 'sculpture', 'photography', 'digital', 'mixed_media'] })
    @ApiQuery({ name: 'search', required: false })
    async getAllArtworks(
        @Query('price') price?: 'asc' | 'desc',
        @Query('artist') artist?: string,
        @Query('type') type?: string,
        @Query('search') search?: string,
    ): Promise<Artwork[]> {
        return this.artworksService.findAll({ price, artist, type, search });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a specific artwork' })
    @ApiResponse({ status: 200, description: 'Artwork details', type: Artwork })
    async getArtwork(@Param('id') id: string): Promise<Artwork> {
        return this.artworksService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Add a new artwork' })
    @ApiResponse({ status: 201, description: 'Artwork created', type: ArtworkResponseDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async createArtwork(@Body() createArtworkDto: CreateArtworkDto): Promise<ArtworkResponseDto> {
        try {
            return await this.artworksService.create(createArtworkDto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            } else {
                throw new BadRequestException('Unknown error occurred');
            }
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing artwork' })
    @ApiResponse({ status: 200, description: 'Artwork updated', type: Artwork })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async updateArtwork(
        @Param('id') id: string,
        @Body() updateArtworkDto: UpdateArtworkDto
    ): Promise<Artwork> {
        try {
            return await this.artworksService.update(id, updateArtworkDto);
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException(error.message);
            } else {
                throw new BadRequestException('Unknown error occurred');
            }
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an artwork' })
    @ApiResponse({ status: 200, description: 'Artwork deleted', type: Artwork })
    async deleteArtwork(@Param('id') id: string): Promise<Artwork> {
        return this.artworksService.delete(id);
    }
}
