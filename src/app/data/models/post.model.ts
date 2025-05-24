export class PostModel {
  idPost?: number;
  title: string;
  text: string;
  imageUrl: string;
  likesCount?: number;
  commentsCount?: number;
  idUser?: number;
  interestIds?: number[];
  updatedAt?: Date;
  user?: any
  likes?: any[];
}
