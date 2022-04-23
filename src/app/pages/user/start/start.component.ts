import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyARecord } from 'dns';
import { element } from 'protractor';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(
    private _questionService : QuestionService,
    private locationSt : LocationStrategy,
    private _route : ActivatedRoute
  ) { }

  qId : any;
  quizTitle : any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  questions : any = 0;
  isSubmit = false;
  timer : any;
   


  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params.qId;
    this.loadQuestions();
    this.startTimer();
    // this.enterFullScreen();
  }



  enterFullScreen() {
    Swal.fire({
      title: 'Enter Fullscreen Mod',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Enter`,
      denyButtonText: `Don't Enter`,
      icon : "question",
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("exam")?.requestFullscreen().catch(console.log);

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  loadQuestions() {
    this._questionService.getQuestionsOfQuizUser(this.qId).subscribe(
      (data : any) => {
        this.questions = data;
        this.quizTitle = this.questions[0].quiz.title;
        this.timer = this.questions.length * 2 * 60; 
      },(error) => {
        Swal.fire('The Internet?', 'That thing is still around?', 'question');
      }
    )
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon : "question",
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if(this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTimer() {
    let min = Math.floor(this.timer/60);
    let sec = this.timer - (min * 60);
    return `${min} min : ${sec} sec`;
  }

  evalQuiz() {
    this.isSubmit = true;
    this._questionService.evalQuizServer(this.questions).subscribe(
      (data : any) => {
        this.marksGot  = parseFloat(Number(data.marksGot).toFixed(2));
        this.attempted = data.attempted;
        this.correctAnswers = data.correctAnswers;
      },(error) => {
        Swal.fire("Server Error", "Unable to Publish Result", "error")
      }
    )
    //--> this is client side evaluation
    // this.isSubmit = true;
    // this.questions.forEach((element : any)=> {
    //   if(element.givenAnswer == element.answer){
    //     this.correctAnswers++;
    //   }
    //   if(element.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // });
    // let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    // this.marksGot = this.correctAnswers * marksSingle;
  }

  printResult() {
    window.print();
  }

}
