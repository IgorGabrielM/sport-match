export class PostModel {
  title: string;
  text: string;
  imageUrl: string;
  likesCount?: number;
  commentsCount?: number;
  idUser?: number;
  interestIds?: number[];
}
