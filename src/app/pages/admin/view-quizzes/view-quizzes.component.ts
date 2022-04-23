import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {


  quizzes: any = [];

  constructor(private _quizService: QuizService) { }

  ngOnInit(): void {
    this._quizService.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Error in loading data", "error");
      }
    )
  }
  deleteQuiz(qId: any) {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      confirmButtonText: "DELETE",
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._quizService.deleteQuiz(qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
            Swal.fire("Success", "Quiz Deleted", "success");
          },
          (error) => {
            Swal.fire("Error !!", "Error in deleting quiz", "error");
          }
        );
      }
    }
    );
  }



}


