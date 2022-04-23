import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService : UserService , private _snackBar : MatSnackBar, private router : Router) { }

  public user = {
    username : '',
    password : '',
    firstname : '',
    lastname : '',
    email : '',
    phone : '',
  };

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      alert('User Name is required');
      return;
    }

    if(this.user.password == '' || this.user.password == null){
      alert('User password is required');
      return;
    }

    if(this.user.firstname == '' || this.user.firstname == null){
      alert('First Name is required');
      return;
    }

    if(this.user.lastname == '' || this.user.lastname == null){
      alert('Last Name is required');
      return;
    }

    if(this.user.email == '' || this.user.email== null){
      alert('Email is required');
      return;
    }


    //addUser : UserService
      this.userService.addUser(this.user).subscribe(
        (data)=>{
          console.log(data);
          // alert('success');
          Swal.fire({
            icon: 'success',
            title: 'Good Job!',
            text: 'User Successfully Registered'
          });
          this.router.navigate(['/login']);
        },
        (error)=> {
          console.log(error);
          // alert('something went wrong');
          this._snackBar.open(error.error.localizedMessage, "ok",{
            duration : 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      );
  
  }

}
