import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  firstn : any;
  lastn :any;
  email:any;
  constructor() {

   }

  ngOnInit(): void {
  }
  // submit(data:any){
  
  //   this.firstn=data.firstn;
  //   this.lastn=data.lastn;
  //   this.email=data.email;
  // }
  onsubmit(data :any) :void
  {
    this.firstn=data.firstn;
    this.lastn=data.lastn;
    this.email=data.email;
    alert(data.firstn.length +"   "+data.email);
  }
}
