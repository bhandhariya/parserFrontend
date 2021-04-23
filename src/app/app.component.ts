import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "./user.service";
import * as csv from 'csvtojson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Users:any;

  ngOnInit(){
    this.getAllUSers();
  }


  title = 'parserApp';
  UserForm= new FormGroup({
    name:new FormControl(''),
    mobile:new FormControl(),
    address:new FormControl('')
  })

  constructor(private user:UserService){

  }

  getAllUSers(){
    this.user.get().subscribe(result=>{
      this.Users=result;
      console.log(this.Users)
    },err=>{
      console.log(err)
    })

  }

  createUser(){
    console.log(this.UserForm.value)
    this.user.create(this.UserForm.value).subscribe(result=>{
      if(result){
        this.getAllUSers();
        alert('User saved');
        this.UserForm.reset();

      }
    },err=>{
      console.log(err)
    })
  }
  deleteUser(user:any){
    console.log(user);
    this.user.delete(user).subscribe(result=>{
      if(result){
        this.getAllUSers();
        alert('User deleted');
        // this.UserForm.reset();

      }
    },err=>{
      console.log(err)
    })
  }
  EditUser=0;
  EditForm:any=FormGroup;
  edit(user:any){
    console.log(user);
    this.EditUser=user._id;
    this.EditForm= new FormGroup({
      _id:new FormControl(user._id),
      name:new FormControl(user.name),
      mobile:new FormControl(user.mobile),
      address:new FormControl(user.address)
    })
  }
  save(user:any){
    console.log(user)
    this.user.edit(user).subscribe(result=>{
      if(result){
        this.getAllUSers();
        alert('User Edited ');
        this.EditForm.reset();
        this.EditUser=0;
      }
    },err=>{
      console.log(err)
    })
  }
  fileReaded:any;
  onfileUpload(event:any){
  //  console.log(event.target.files[0]);
  //  csv().fromFile(event.target.files[0]).then(jsonObj=>{
  //    console.log(jsonObj)
  //  })
  this.fileReaded = event.target.files[0];
  let reader: FileReader = new FileReader();
  reader.readAsText(this.fileReaded);   
  }
  excelData:any;
convertFile(csv: any) {  
  
  this.fileReaded = csv.target.files[0];  
    
  let reader: FileReader = new FileReader();  
  reader.readAsText(this.fileReaded);  
    
  reader.onload = (e) => {  
  let csv: any = reader.result;  
  let allTextLines = csv.split(/\r|\n|\r/);  
  let headers = allTextLines[0].split(',');  
  let lines = [];  
    
  for (let i = 0; i < allTextLines.length; i++) {  
  // split content based on comma  
  let data = allTextLines[i].split(',');  
  if (data.length === headers.length) {  
  let tarr = [];  
  for (let j = 0; j < headers.length; j++) {  
  tarr.push(data[j]);  
  }  
    
  // log each row to see output  
  // console.log(tarr);  
  lines.push(tarr);  
  }  
  }  
  // all rows in the csv file  
  console.log(">>>>>>>>>>>>>>>>>", lines);  


  this.excelData=lines;
  this.savedatafromExcel(lines);

  }  
}

savedatafromExcel(data:any){
  this.user.saveexcelData(data).subscribe(r=>{
    console.log(r);
    this.getAllUSers();
  })
}
}
