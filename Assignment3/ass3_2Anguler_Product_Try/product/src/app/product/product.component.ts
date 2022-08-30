import { Component, OnInit } from '@angular/core';
import { FormsModule,FormControl,Validators } from '@angular/forms';
import { prod } from '../prod';
import { PRODUCTS } from '../productClass';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  roll_no:number = 4;
  myDate: Date = new Date();
  content : string = "Hello World";
  
  pros = PRODUCTS;
  
  constructor() { }

  ngOnInit(): void {
  }
  
}
