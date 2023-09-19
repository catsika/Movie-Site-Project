import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsArray,
} from 'class-validator';

export class MovieDetails {
  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}

export class MovieMedia {
  @IsNotEmpty()
  poster: string;

  @IsNotEmpty()
  trailer: string;
}

export class UploadMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  synopsis: string;

  @IsArray()
  @IsNotEmpty({ each: true }) // Ensure every item in the array is not empty
  genre: string[];

  @IsDateString()
  releaseDate: Date;

  @IsNumber()
  duration: number;

  @IsNumber()
  rating: number;

  poster: string;

  trailer: string;
}
