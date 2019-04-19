import { Component, OnInit } from '@angular/core';
import * as productDetails from '../../../products.json';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productList: any = productDetails.default.products;
  public displayedColumns: string[] = ['serialNumber', 'name', 'weight', 'availability', 'isEditable'];
  public dataSource;

   constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      if (params.updatedProduct) {
      const updatedProduct: any = JSON.parse(params.updatedProduct);

      this.productList.forEach((product: any) => {
        if (product.serialNumber === updatedProduct.serialNumber) {
          product.name = updatedProduct.productName 
          product.pricingTier = updatedProduct.productTier 
          product.priceRange = updatedProduct.productRange
          product.weight = updatedProduct.productWeight
          product.availability = updatedProduct.productAvailability
          product.productUrl = updatedProduct.productURL
          product.isEditable = updatedProduct.isEditable
        }
      });
      this.dataSource = this.productList;

      } else {
        this.dataSource = this.productList;
      }
    });
  }

  public ngOnInit() {}

  openEditProductForm(product: any) {
    this.router.navigate(['/editProduct'], {queryParams: {productInformation: JSON.stringify(product)}});
  }

}
