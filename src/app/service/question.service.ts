import { environment } from './../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public BASE_URL = environment.apiGameUrl;

  constructor(
    private _http: HttpClient,
    private _auth: AuthService
  ) { }

  insertQuestion(question) {
    return this._http.post(this.BASE_URL + 'questions', question);
  }

  updateQuestion(question) {
    return this._http.put(this.BASE_URL + 'questions', question);
  }

  deleteQuestion(id) {
    return this._http.delete(this.BASE_URL + 'questions/' + id);
  }

  patchQuestion(questionId, modifiedQuestion) {
    return this._http.patch(this.BASE_URL + 'questions/' + questionId, modifiedQuestion);
  }

  addQuestionAnswer(questionId, answer) {
    return this._http.post(this.BASE_URL + 'questions/' + questionId + '/answers', answer);
  }

  getQuestionAnswers(id: number): Observable<Object> {
    return this._http.get(this.BASE_URL + 'questions/' + id + '/answers');
  }

}
