import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http : HttpClient) { }

  // get all the question of a quiz --> Admin
  public getAllQuestionsOfQuiz(qid : any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  // get max number of question of a quiz --> User
  public getQuestionsOfQuizUser(qid : any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  // get a particular question with quesId
  public getQuestionByQuesId(quesId : any) {
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  // evaluate the quiz on the server side
  public evalQuizServer(data : any) {
    return this._http.post(`${baseUrl}/question/eval-quiz` , data);
  }

  public addQuestion(question : any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(quesId : any) {
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }

  public updateQuestion(question : any) {
    return this._http.put(`${baseUrl}/question/`,question);
  }
}
