export interface Movie {
  _id: string;
  title: string;
  synopsis: string;
  genre: string[];
  details: {
    releaseDate: Date;
    duration: number;
    rating: number;
  };
  media: {
    poster: string;
    trailer: string;
  };
  dateUploaded: Date;
}

export interface newMovie {
  title: string;
  synopsis: string;
  genre: string[];
  releaseDate: Date | null;
  duration: number;
  rating: number;
  poster: FormData;
  trailer: FormData;
}

