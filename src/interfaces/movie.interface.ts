

export enum MovieGenre {
    Action = 'Action',
    Comedy = 'Comedy',
    Horror = 'Horror',
    Thriller = 'Thriller',
    Romance = 'Romance'
  }
  
  export interface MovieInterface {
    id?: string;
    movieName: string;
    description: string;
    genre: MovieGenre;
    category: string[];
  }
  