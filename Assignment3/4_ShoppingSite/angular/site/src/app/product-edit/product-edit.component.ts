import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product:any={};
  angForm:FormGroup;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private ps:ProductService,
    private fb:FormBuilder) {
      this.angForm = this.fb.group({
        name: ['', Validators.required ],
        price: ['', Validators.required ],
        mdate: ['', Validators.required ],
        brand: ['', Validators.required ],
        description: ['', Validators.required ],
        img: ['']
     })
    }
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.ps.editProduct(params['id']).subscribe(res=>{
        this.product=res;
      })
    })
  }

  updateProduct(id:any,name :string, price :number,mdate :string,brand:string,description:string){
    this.ps.updateProduct(id,name,price,mdate,brand,description);
    this.router.navigate(['product']);
  }
}
