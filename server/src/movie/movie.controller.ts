import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { MovieDocument } from './movie.schema';
import { MovieService } from './movie.service';
import {
  MovieDetails,
  MovieMedia,
  UploadMovieDto,
} from './entity/movie.structure';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('getAllMovies')
  async getAllMovies(): Promise<MovieDocument[]> {
    return await this.movieService.findall();
  }

  @Get('getMovie/:id')
  async getMovie(@Param('id') id: string): Promise<MovieDocument> {
    return await this.movieService.findMovie(id);
  }

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'poster', maxCount: 1 }, // Intercept only 1 file for the 'poster' field
      { name: 'trailer', maxCount: 1 }, // Intercept only 1 file for the 'trailer' field
    ]),
  )
  async uploadMovie(
    @Body() movieData: UploadMovieDto,
    @UploadedFiles()
    files: { poster?: Express.Multer.File[]; trailer?: Express.Multer.File[] },
  ): Promise<MovieDocument> {
    const { title, synopsis, genre, releaseDate, duration, rating } = movieData;

    // Explicitly convert duration and rating to numbers
    const durationNumber = parseFloat(duration.toString());
    const ratingNumber = parseFloat(rating.toString());

    const movie = plainToClass(UploadMovieDto, {
      title,
      synopsis,
      genre,
      releaseDate,
      duration: durationNumber,
      rating: ratingNumber,
    });

    const errors = await validate(movie);

    if (errors.length > 0) {
      console.error(errors);
      // Return a 400 Bad Request response with the validation errors
      throw new HttpException(
        {
          message: 'Validation failed',
          errors: errors.map((error) => error.toString()),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const uploadedPoster = await this.movieService.uploadMedia(files.poster[0]);

    const uploadedTrailer = await this.movieService.uploadMedia(
      files.trailer[0],
    );

    const media: MovieMedia = {
      poster: uploadedPoster.url,
      trailer: uploadedTrailer.url,
    };

    const details: { releaseDate: Date; duration: number; rating: number } = {
      releaseDate,
      duration,
      rating,
    };

    return await this.movieService.upload(
      title,
      synopsis,
      genre,
      details,
      media,
    );
  }

  @UseGuards(JwtGuard)
  @Patch('update/:id')
  async updateMovie(
    @Param('id') id: string,
    @Body() movieData: UploadMovieDto,
  ) {
    const {
      title,
      synopsis,
      genre,
      releaseDate,
      duration,
      rating,
      poster,
      trailer,
    } = movieData;

    const media: MovieMedia = { poster, trailer };
    const details: MovieDetails = { releaseDate, duration, rating };

    return await this.movieService.update(
      id,
      title,
      synopsis,
      genre,
      details,
      media,
    );
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async deleteMovie(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}

