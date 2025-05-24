import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventModel} from '../models/event.model';
import {PostModel} from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://sport-match-ccc44204aa55.herokuapp.com/posts'; // URL do JSON Server

  constructor(private http: HttpClient) {}

  createPost(post: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(this.apiUrl, post);
  }

  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.apiUrl);
  }

  findPost(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.apiUrl}/${id}`);
  }

  async addLike(payload: { idPost: number, idUser: number }): Promise<any> {
    try {
      const response = await this.http.post<PostModel>(`${this.apiUrl}/post/addLike`, payload).toPromise();
      return response
    } catch (error) {
    }
  }

  async removeLike(payload: { idPost: number, idUser: number }): Promise<any> {
    try {
      const response = await this.http.post<PostModel>('https://esg-project-server-8ce870babc5e.herokuapp.com/posts/post/removeLike', payload).toPromise();
      return response
    } catch (error) {
    }
  }
}
