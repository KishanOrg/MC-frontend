import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _snackBar : MatSnackBar, private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
  }

  loginData = {
    username : '',
    password : '',
  };

  formSubmit(){
    if(this.loginData.username.trim()=='' || this.loginData.username == null){
      this._snackBar.open("Username is required", "", {
        duration : 3000
      });
    }

    if(this.loginData.password.trim()=='' || this.loginData.password == null){
      this._snackBar.open("password is required", "Ok", {
        duration : 3000,
        verticalPosition: 'top',
          horizontalPosition: 'right'
      });
    }

    // request to server to generate token

    this.loginService.generateToken(this.loginData).subscribe(
      (data : any) => {

        //login...
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user : any) => {
            this.loginService.setUser(user);
            // console.log("the logged user is " + user.authorities[0].authority);

            //redirect ...ADMIN: admin-dashboard
            //redirect ...NORMAL: normal-dashborad

            if(this.loginService.getUserRole() == "Normal"){
              //redirect to user dashboard
              // window.location.href = '/user';
              this.router.navigate(['user/0']);
              this.loginService.loginStatusSubject.next();
            }
            if(this.loginService.getUserRole() == "ADMIN"){
              //redirect to admin dashboard
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            }


        });


      },
      (error : any) => {
        console.log('Error !');
        console.log(error);
        this._snackBar.open("Invalid Credentials !! Try Again", "", {
          duration : 3000,
          verticalPosition : "top",
          horizontalPosition : "right"
        });
      } 
     );
    



  }

}
