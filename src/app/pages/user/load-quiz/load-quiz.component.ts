import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private _route : ActivatedRoute, private _quizService : QuizService) { }
  cid : any;
  quizzes : any = {};

  ngOnInit(): void {
    
    this._route.params.subscribe((params) => {
      this.cid = params.cid;
      if(this.cid == 0) {
        // show all quizzes
        this._quizService.getActiveQuizzes().subscribe(
          (data : any) => {
            this.quizzes = data;
          },
          (error) => {
            Swal.fire('The Internet?', 'That thing is still around?', 'question');
          }
          
        );
      }else {
        //show specific quiz
        this._quizService.getActiveQuizzesByCategory(this.cid).subscribe(
          (data : any) => {
            this.quizzes = data;
          },
          (error) => {
            Swal.fire('The Internet?', 'That thing is still around?', 'question');
          }
        );
      }
    })
  }
}
