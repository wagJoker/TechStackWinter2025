import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';

@Injectable()
export class GalleriesService {
  private galleries = [];

  create(createGalleryDto: CreateGalleryDto) {
    const newGallery = {
      id: this.galleries.length + 1,
      ...createGalleryDto,
    };
    this.galleries.push(newGallery);
    return newGallery;
  }

  findAll() {
    return this.galleries;
  }

  findOne(id: number) {
    return this.galleries.find(gallery => gallery.id === id);
  }

  update(id: number, updateGalleryDto: CreateGalleryDto) {
    const galleryIndex = this.galleries.findIndex(gallery => gallery.id === id);
    if (galleryIndex > -1) {
      this.galleries[galleryIndex] = { id, ...updateGalleryDto };
      return this.galleries[galleryIndex];
    }
    return null;
  }

  remove(id: number) {
    const galleryIndex = this.galleries.findIndex(gallery => gallery.id === id);
    if (galleryIndex > -1) {
      return this.galleries.splice(galleryIndex, 1);
    }
    return null;
  }
}