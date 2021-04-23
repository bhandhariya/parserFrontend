import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  connection="";

  create(user:any){
    return this.http.post('http://localhost:3000/users/create',user);
  }
  get(){
    return this.http.get('http://localhost:3000/users/getAllUser');
  }
  delete(user:any){
    return this.http.post('http://localhost:3000/users/delete',user);
  }
  edit(user:any){
    return this.http.post('http://localhost:3000/users/edit',user);
  }
  saveexcelData(data:any){
    return this.http.post('http://localhost:3000/users/saveExcel',data);
  }
}
