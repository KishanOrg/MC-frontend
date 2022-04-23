import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private _categories : CategoryService,private _quizService : QuizService, private _matSnack : MatSnackBar) { }

  categories : any = [];

  quizData = {
    title : "",
    description : "",
    maxMarks : "",
    numOfQsn : "",
    active : true,
    category : {
      cid : ''
    }
  };

  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data : any) => {
        this.categories = data;
        console.log(" ");
      },
      (error) => {
        console.log(error);
        Swal.fire("Server Error !!", "Error in loading data", "error")
      }
    );
  }

  // Add Quiz 
  addQuiz() {
    if(this.quizData.title.trim() == "" || this.quizData.title == null) {
      this._matSnack.open("Title Required !!", "ok", {
        duration : 3000,
        verticalPosition : "top",
        horizontalPosition : "right"
      });
      return ; 
    }

    if(this.quizData.maxMarks.trim() == "" || this.quizData.maxMarks == null) {
      this._matSnack.open("Maximum Marks Required !!", "ok", {
        duration : 3000,
        verticalPosition : "top",
        horizontalPosition : "right"
      });
      return ; 
    }

    if(this.quizData.numOfQsn.trim() == "" || this.quizData.numOfQsn == null) {
      this._matSnack.open("Number of Question Required !!", "ok", {
        duration : 3000,
        verticalPosition : "top",
        horizontalPosition : "right"
      });
      return ; 
    }

    if(this.quizData.category.cid == "" || this.quizData.category.cid == null) {
      this._matSnack.open("Category Required !!", "ok", {
        duration : 3000,
        verticalPosition : "top",
        horizontalPosition : "right"
      });
      return ; 
    }

    // call server

    this._quizService.addQuiz(this.quizData).subscribe(
      (data : any) => {
        Swal.fire("Success", "Quiz is added successfully", "success");
        this.quizData = {
          title : "",
          description : "",
          maxMarks : "",
          numOfQsn : "",
          active : true,
          category : {
            cid : ''
          }
        };
      },
      (error) => {
        // console.log(error);
        Swal.fire("Error !!", "Error in adding quiz", "error");
      }
    );

  }

}
