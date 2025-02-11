import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsIn, IsNumber, Min, IsBoolean, IsOptional, IsUrl } from 'class-validator';
import { Artwork } from '../entities/artwork.entity';

export class CreateArtworkDto {
    @ApiProperty({ maxLength: 99 })
    @IsString()
    @MaxLength(99)
    title!: string;

    @ApiProperty({ maxLength: 50 })
    @IsString()
    @MaxLength(50)
    artist!: string;

    @ApiProperty({ enum: ['painting', 'sculpture', 'photography', 'digital', 'mixed_media'] })
    @IsString()
    @IsIn(['painting', 'sculpture', 'photography', 'digital', 'mixed_media'])
    type!: string;

    @ApiProperty({ minimum: 0 })
    @IsNumber()
    @Min(0)
    price!: number;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    availability?: boolean;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @IsUrl()
    imageUrl?: string;
}

export class UpdateArtworkDto {
    @ApiProperty({ maxLength: 99 })
    @IsString()
    @MaxLength(99)
    @IsOptional()
    title?: string;

    @ApiProperty({ maxLength: 50 })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    artist?: string;

    @ApiProperty({ enum: ['painting', 'sculpture', 'photography', 'digital', 'mixed_media'], required: false })
    @IsString()
    @IsIn(['painting', 'sculpture', 'photography', 'digital', 'mixed_media'])
    @IsOptional()
    type?: string;

    @ApiProperty({ minimum: 0, required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    availability?: boolean;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    @IsUrl()
    imageUrl?: string;
}

export class ArtworkResponseDto {
    @ApiProperty({ example: 'Artwork successfully created' })
    message!: string;

    @ApiProperty({ type: () => Artwork })
    artwork!: Artwork;
}
