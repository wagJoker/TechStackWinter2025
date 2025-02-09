import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  private artists = [];

  create(createArtistDto: CreateArtistDto) {
    const artist = { id: Date.now(), ...createArtistDto };
    this.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: number) {
    return this.artists.find(artist => artist.id === id);
  }

  update(id: number, updateArtistDto: CreateArtistDto) {
    const artistIndex = this.artists.findIndex(artist => artist.id === id);
    if (artistIndex > -1) {
      this.artists[artistIndex] = { id, ...updateArtistDto };
      return this.artists[artistIndex];
    }
    return null;
  }

  remove(id: number) {
    const artistIndex = this.artists.findIndex(artist => artist.id === id);
    if (artistIndex > -1) {
      return this.artists.splice(artistIndex, 1);
    }
    return null;
  }
}