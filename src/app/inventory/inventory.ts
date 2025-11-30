import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Inventory } from '../services/inventory';
import { ProductsService } from '../services/products';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html'
})
export class InventoryComponent implements OnInit {
  inventory: Inventory[] = [];
  products: any[] = [];
  showModal = false;
  editingItem: Inventory | null = null;

  formData = {
    id_producto: 0,
    talla: 0,
    cantidad: 0,
    cantidad_minima: 5,
    ubicacion: ''
  };

  constructor(
    private inventoryService: InventoryService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loadInventory();
    this.loadProducts();
  }

  loadInventory() {
    this.inventoryService.getInventory().subscribe({
      next: (inventory) => this.inventory = inventory,
      error: (error) => console.error('Error loading inventory:', error)
    });
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (error) => console.error('Error loading products:', error)
    });
  }

  showForm() {
    this.showModal = true;
    this.editingItem = null;
    this.resetForm();
  }

  hideForm() {
    this.showModal = false;
    this.editingItem = null;
    this.resetForm();
  }

  editInventory(item: Inventory) {
    this.editingItem = item;
    this.formData = {
      id_producto: item.id_producto,
      talla: item.talla,
      cantidad: item.cantidad,
      cantidad_minima: item.cantidad_minima,
      ubicacion: item.ubicacion || ''
    };
    this.showModal = true;
  }

  saveInventory() {
    if (this.editingItem) {
      this.inventoryService.updateInventory(this.editingItem.id_inventario, this.formData).subscribe({
        next: () => {
          this.loadInventory();
          this.hideForm();
        },
        error: (error) => console.error('Error updating inventory:', error)
      });
    } else {
      this.inventoryService.addStock(this.formData).subscribe({
        next: () => {
          this.loadInventory();
          this.hideForm();
        },
        error: (error) => console.error('Error adding stock:', error)
      });
    }
  }

  resetForm() {
    this.formData = {
      id_producto: 0,
      talla: 0,
      cantidad: 0,
      cantidad_minima: 5,
      ubicacion: ''
    };
  }
}
