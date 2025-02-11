import { ApiProperty } from '@nestjs/swagger';

export class Artwork {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    title!: string;

    @ApiProperty()
    artist!: string;

    @ApiProperty()
    type!: string;

    @ApiProperty()
    price!: number;

    @ApiProperty()
    availability!: boolean;

    @ApiProperty()
    imageUrl!: string;
}
