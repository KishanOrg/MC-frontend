import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {


  categories: any = [];

  constructor(private _categorySerivce: CategoryService, private router: Router, private _matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._categorySerivce.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log("  ");
      },
      (error) => {
        console.log("  ");
        Swal.fire("Error !!", "Error in loading data", "error");
      }
    );

    this._categorySerivce.categoryStatus.asObservable().subscribe((data) => {
      this._categorySerivce.categories().subscribe(
        (data: any) => {
          this.categories = data;
          console.log("  ");
        },
        (error) => {
          console.log("  ");
          Swal.fire("Error !!", "Error in loading data", "error");
        }
      );
    });
  }


  deleteCategory(cid: any) {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      confirmButtonText: "DELETE",
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._categorySerivce.deleteCategory(cid).subscribe(
          (data: any) => {
            console.log("deleted successfully");
            this._matSnackBar.open("Deleted Successfull !!", "Ok", {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
    
            this._categorySerivce.categoryStatus.next(true);
            this.router.navigate(['/admin/view-categories/']);
            // / window.location.href = '/admin/view-categories';
          },
          (error) => {
            Swal.fire('The Internet?', 'That thing is still around?', 'question');
          }
        );
      }
    }
    );
  }
 

}











