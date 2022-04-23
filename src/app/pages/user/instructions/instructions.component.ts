import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private _route : ActivatedRoute, private _quizService : QuizService) { }
  quiz : any = {};
  qId : any = "";
  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qId;
    this._quizService.getQuiz(this.qId).subscribe(
      (data : any) => {
        this.quiz = data;
      },(error) => {
        Swal.fire('The Internet?', 'That thing is still around?', 'question');
      }
    )
  }

}
