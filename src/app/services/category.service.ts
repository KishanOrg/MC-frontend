import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoryStatus = new Subject<boolean>();

  constructor(private _http : HttpClient) { }

  //load all category
  public categories() {
    return this._http.get(`${baseUrl}/category/`)
  }

  //add category
  public addCategory(data : any) {
    return this._http.post(`${baseUrl}/category/`, data);
  }

  //delete category
  public deleteCategory(cid : any) {
    return this._http.delete(`${baseUrl}/category/`+cid);
  }

  //update category 
  public updateCategory(category : any) {
    return this._http.put(`${baseUrl}/category/`, category);
  }

  //get category by category id
  public getCategoryById(cid : any) {
    return this._http.get(`${baseUrl}/category/${cid}`);
  }


}
