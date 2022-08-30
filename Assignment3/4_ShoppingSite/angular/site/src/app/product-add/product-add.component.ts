import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  angForm:FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ps:ProductService
    ) {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ],
      mdate: ['', Validators.required ],
      brand: ['', Validators.required ],
      description: ['', Validators.required ],
      img: ['']
    });
  }
  
  addProduct(name :string, price :number,mdate :string,brand:string,description:string)
  {
    alert(name +" "+price+" "+mdate + " " + brand + " " + description );
    this.ps.addProduct(name,price,mdate,brand,description);
    this.router.navigate(['product']);
  }
  
  ngOnInit(): void {

  }
 
}
