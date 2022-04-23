import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http : HttpClient) { }

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz : any) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  public deleteQuiz(qId : any) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  public getQuiz(qId : any) {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  public getQuizByCategory(cid : any) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  public updateQuiz(quiz : any) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  // get all the active quizzes
  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/active/`);
  }

  // get all the active quizzes
  public getActiveQuizzesByCategory(cid : any) {
    return this._http.get(`${baseUrl}/quiz/active/category/${cid}`);
  }

}
