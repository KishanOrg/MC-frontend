import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId : any = 0;
  quiz : any = {
    category : {
      cid : ""
    }
  };
  categories : any = {
  };
  constructor(private router : Router,private _route : ActivatedRoute, private _quizSerivce : QuizService, private _categoryService : CategoryService) { }

  ngOnInit(): void {
    this.qId =this._route.snapshot.params.qId;

    //fetching the categories
    this._categoryService.categories().subscribe(
      (data : any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire("Server Error !!", "Error in loading data", "error")
      }
    );
    // fetching the quiz
    this._quizSerivce.getQuiz(this.qId).subscribe(
      (data : any) => {
        this.quiz = data;
      },
      (error) => {
        Swal.fire("Error !!", "Unable to fetch the Quiz data", "error");
      }
    );
  }

  //update form submit
  public updateQuiz() {
    // validate the form

    this._quizSerivce.updateQuiz(this.quiz).subscribe(
      (data : any) => {
        Swal.fire("Success !!", "Quiz Update", "success");
        this.router.navigate(['/admin/view-quizzes/']);
      },
      (error) => {
        Swal.fire("Error !!", "Error in updating quiz", "error");
        console.log(error);
      }
    )
  }

}
