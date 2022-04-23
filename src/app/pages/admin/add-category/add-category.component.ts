import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title : "",
    description : ""
    };
  constructor(private _categoryService : CategoryService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if(this.category.title.trim() == "" || this.category.title == null){
        this._snackBar.open("Title Required !!", "Error", {
          duration : 3000,
          verticalPosition : "top",
          horizontalPosition : "right"
        });
        return;
    }

    // all done 
    this._categoryService.addCategory(this.category).subscribe(
      (data : any) => {
        Swal.fire("Success !!", "Category is added successfully 😊", "success");
        this.category.title = "";
        this.category.description = "";
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Server Error 😢", "error");
      }
    )
  }

}
