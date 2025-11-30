import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../services/products';
import { CategoriesService } from '../services/categories';
import { OrdersService } from '../services/orders';
import { CustomersService } from '../services/customers';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
   productsCount = 0;
  categoriesCount = 0;
  ordersCount = 0;
  customersCount = 0;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private ordersService: OrdersService,
    private customersService: CustomersService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productsService.getProducts().subscribe(products => {
      this.productsCount = products.length;
    });

    this.categoriesService.getCategories().subscribe(categories => {
      this.categoriesCount = categories.length;
    });

    this.ordersService.getOrders().subscribe(orders => {
      this.ordersCount = orders.length;
    });

    this.customersService.getCustomers().subscribe(customers => {
      this.customersCount = customers.length;
    });
  }
}
