import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDocument } from './movie.schema';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie')
    private readonly movieModel: Model<MovieDocument>,
  ) {}

  async findall(): Promise<MovieDocument[]> {
    return await this.movieModel.find().exec();
  }

  async findMovie(id: string): Promise<MovieDocument> {
    return await this.movieModel.findById(id).exec();
  }

  async uploadMedia(file: Express.Multer.File): Promise<{ url: string }> {
    return new Promise<{ url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({ url: result.secure_url });
          }
        })
        .end(file.buffer);
    });
  }
  async upload(
    title: string,
    synopsis: string,
    genre: string[],
    details: { releaseDate: Date; duration: number; rating: number },
    media: { poster: {}; trailer: {} },
  ): Promise<MovieDocument> {
    const newMovie = new this.movieModel({
      title,
      synopsis,
      genre,
      details,
      media,
    });
    return await newMovie.save();
  }

  async update(
    id: string,
    newTitle: string,
    newSynopsis: string,
    newGenre: string[],
    newDetails: { releaseDate?: Date; duration?: number; rating?: number },
    newMedia: { poster?: string; trailer?: string },
  ): Promise<MovieDocument> {
    let existingMovie = await this.findMovie(id);

    if (newTitle) {
      existingMovie.title = newTitle;
    }
    if (newSynopsis) {
      existingMovie.synopsis = newSynopsis;
    }
    if (newGenre) {
      existingMovie.genre = newGenre;
    }
    if (newDetails) {
      existingMovie.details = {
        ...existingMovie.details,
        ...(newDetails.releaseDate && { releaseDate: newDetails.releaseDate }),
        ...(newDetails.duration && { duration: newDetails.duration }),
        ...(newDetails.rating && { rating: newDetails.rating }),
      };
    }
    // if (newMedia) {
    //   if (newMedia.poster) {
    //     const uploadedPoster = await this.uploadMedia(newMedia.poster);
    //     existingMovie.media.poster = uploadedPoster.url;
    //   }
    //   if (newMedia.trailer) {
    //     const uploadedTrailer = await this.uploadMedia(newMedia.trailer);
    //     existingMovie.media.trailer = uploadedTrailer.url;
    //   }
    // }

    return await existingMovie.save();
  }

  async delete(id: string) {
    return await this.movieModel.deleteOne({ _id: id }).exec();
  }
}
