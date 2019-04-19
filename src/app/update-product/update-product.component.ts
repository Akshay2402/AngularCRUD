import { Component, OnInit } from '@angular/core';
import * as productDetails from '../../../products.json';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  pricing: any = productDetails.default.pricingInfo;
  productDetailsRecieved: any;
  model: any = {};

  onSubmit() {
    this.router.navigate(['/'], {queryParams: {updatedProduct: JSON.stringify(this.model)}})
  }

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe((params: any) => {
      this.productDetailsRecieved = JSON.parse(params.productInformation);
  
      this.model = {
        serialNumber: this.productDetailsRecieved.serialNumber,
        productName: this.productDetailsRecieved.name,
        productWeight: this.productDetailsRecieved.weight,
        productAvailability: this.productDetailsRecieved.availability,
        productURL: this.productDetailsRecieved.productUrl, 
      };
    });
  }

  ngOnInit() {
  }

  editable(event: any) {
    if (event.checked) {
      this.model.isEditable = event.source.value;
    } else {
      delete this.model.isEditable;
    }
  }
}
