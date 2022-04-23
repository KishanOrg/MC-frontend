import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  question : any = {
    quesId : "",
    content : "",
    option1 : "",
    option2 : "",
    option3 : "",
    option4 : "",
    answer : "" ,
    quiz : {},
  };

  constructor(private _questionService : QuestionService, private _route : ActivatedRoute, private _matSnackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.question.quesId = this._route.snapshot.params.quesId;
    this._questionService.getQuestionByQuesId(this.question.quesId).subscribe(
      (data : any) => {
        this.question = data;
      },
      (error) => {
        Swal.fire("Error !!", "Error in loading question", "error");
      }
    )
  }

  formSubmit() {
    if(this.question.content.trim() == '' || this.question.content == null ) {
      this._matSnackBar.open("Missing Content !!", "Refactor", {
        duration : 3000,
        horizontalPosition : "right",
        verticalPosition : "top"
      });
      return ;
    }

    if(this.question.option1.trim() == '' || this.question.option1 == null 
        || this.question.option2.trim() == '' || this.question.option2 == null   ) {
      this._matSnackBar.open("Two option are must !!", "Refactor", {
        duration : 3000,
        horizontalPosition : "right",
        verticalPosition : "top"
      });
      return ;
    }


    if(this.question.answer.trim() == '' || this.question.answer == null ) {
      this._matSnackBar.open("Choose an answer !!", "Refactor", {
        duration : 3000,
        horizontalPosition : "right",
        verticalPosition : "top"
      });
      return ;
    }


    this._questionService.updateQuestion(this.question).subscribe(
      (data : any) => {
          Swal.fire("Success !!", "Question is added successfully", "success");
      },(error) => {
        Swal.fire("Error !!", "Unable to add question", "error");
      }
    )
  }

}
