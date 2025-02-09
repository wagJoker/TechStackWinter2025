import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';

@Controller('galleries')
export class GalleriesController {
  constructor(private readonly galleriesService: GalleriesService) {}

  @Post()
  create(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleriesService.create(createGalleryDto);
  }

  @Get()
  findAll() {
    return this.galleriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleriesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createGalleryDto: CreateGalleryDto) {
    return this.galleriesService.update(id, createGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleriesService.remove(id);
  }
}