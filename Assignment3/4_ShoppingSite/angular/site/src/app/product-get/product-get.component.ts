import { Component, OnInit } from '@angular/core';
import Product from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {

  product:Product[]=[];
  constructor(private ps:ProductService) { }

  ngOnInit(): void {
    this.ps.getProduct().subscribe((data:Product[])=>{
      this.product=data;
    })
  }

   deleteProduct(id:any){
     this.ps.deleteProduct(id).subscribe(res=>{
       console.log('Deleted');
       this.ngOnInit();
     })
   }
}
