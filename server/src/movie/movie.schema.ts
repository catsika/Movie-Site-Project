import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  synopsis: string;

  @Prop({ required: true })
  genre: string[];

  @Prop({
    required: true,
    default: { details: { tags: ['none'] } },
    type: () => ({}),
  })
  details: {
    releaseDate: Date;
    duration: number;
    rating: number;
    tags?: string[]; // Make the tags property optional by using the "?" symbol
  };

  @Prop({ required: true, type: () => ({}) })
  media: {
    poster: string;
    trailer: string;
  };

  @Prop({ required: true, default: Date.now })
  dateUploaded: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
