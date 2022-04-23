import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId : any = "";
  title : any = "";
  questions= [
    {
      quesId  : "",
      content : "",
      option1 : "",
      option2 : "",
      option3 : "",
      option4 : "",
      answer : "",
    }
  ];
  constructor(private _route : ActivatedRoute, private _questionService : QuestionService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qId;
    this.title = this._route.snapshot.params.title;
    this._questionService.getAllQuestionsOfQuiz(this.qId).subscribe(
      (data : any) => {
        this.questions = data;
        console.log(data);
      },(error) => {
        Swal.fire("Error !!", "Unable to load the Question", "error");
      }
    )
  }

  deleteQuestion(quesId : any) {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      confirmButtonText : "DELETE",
      showCancelButton : true
    }).then((result) => {
      if(result.isConfirmed){
        this._questionService.deleteQuestion(quesId).subscribe(
          (data : any) => {
            this.questions = this.questions.filter((question : any) => question.quesId != quesId);
            Swal.fire("Success !!", "Question deleted Successfully", "success");
          },(error) => {
            Swal.fire("Error !!", "Unable to delete", "error");
          }
        );
      }
    });

  }

}
