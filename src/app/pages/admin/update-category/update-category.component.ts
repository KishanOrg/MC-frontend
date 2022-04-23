import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private router : Router, private _router : ActivatedRoute, private _categoryService : CategoryService, private _snackBar : MatSnackBar) { }

  category = {
    cid : "",
    title : "",
    description : ""
  };

  ngOnInit(): void {
    this.category.cid = this._router.snapshot.params.cid;
    this._categoryService.getCategoryById(this.category.cid).subscribe(
      (data : any) => {
        this.category = data;
      },(error) => {
        Swal.fire('Error', 'Error in loading the category details', 'error');
      }
    )
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
    this._categoryService.updateCategory(this.category).subscribe(
      (data : any) => {
        Swal.fire("Success !!", "Category is added successfully 😊", "success");
        this.router.navigate(['/admin/view-categories/']);
      },
      (error) => {
        Swal.fire("Error !!", "Server Error 😢", "error");
      }
    )
  }

}
