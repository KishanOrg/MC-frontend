import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  public Editor = ClassicEditor;
  qId : any;
  title : any;
  question : any = {
    content : "",
    option1 : "",
    option2 : "",
    option3 : "",
    option4 : "",
    answer : "" ,
    quiz : {},
  }

  constructor(private _matSnackBar : MatSnackBar,private _router : ActivatedRoute, private _questionService : QuestionService) { }

  ngOnInit(): void {
    this.qId = this._router.snapshot.params.qId;
    this.title = this._router.snapshot.params.title;
    this.question.quiz['qId'] = this.qId;

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


    this._questionService.addQuestion(this.question).subscribe(
      (data : any) => {
          Swal.fire("Success !!", "Question is added successfully", "success");
          console.log(this.question);
          this.question = {
            content : "",
            option1 : "",
            option2 : "",
            option3 : "",
            option4 : "",
            answer : "" ,
            quiz  : {
              qId : this.qId,
            },
          };
      },(error) => {
        Swal.fire("Error !!", "Unable to add question", "error");
      }
    )
  }

   
}
