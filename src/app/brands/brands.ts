import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandsService, Brand } from '../services/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brands.html'
})
export class Brands implements OnInit {
  brands: Brand[] = [];
  showModal = false;
  editingBrand: Brand | null = null;

  formData = {
    nombre: '',
    descripcion: '',
    logo_url: ''
  };

  constructor(private brandsService: BrandsService) {}

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.brandsService.getBrands().subscribe({
      next: (brands) => this.brands = brands,
      error: (error) => console.error('Error loading brands:', error)
    });
  }

  showForm() {
    this.showModal = true;
    this.editingBrand = null;
    this.resetForm();
  }

  hideForm() {
    this.showModal = false;
    this.editingBrand = null;
    this.resetForm();
  }

  editBrand(brand: Brand) {
    this.editingBrand = brand;
    this.formData = { ...brand };
    this.showModal = true;
  }

  saveBrand() {
    if (this.editingBrand) {
      this.brandsService.updateBrand(this.editingBrand.id_marca, this.formData).subscribe({
        next: () => {
          this.loadBrands();
          this.hideForm();
        },
        error: (error) => console.error('Error updating brand:', error)
      });
    } else {
      this.brandsService.createBrand(this.formData).subscribe({
        next: () => {
          this.loadBrands();
          this.hideForm();
        },
        error: (error) => console.error('Error creating brand:', error)
      });
    }
  }

  deleteBrand(id: number) {
    if (confirm('¿Estás seguro de eliminar esta marca?')) {
      this.brandsService.deleteBrand(id).subscribe({
        next: () => this.loadBrands(),
        error: (error) => console.error('Error deleting brand:', error)
      });
    }
  }

  resetForm() {
    this.formData = {
      nombre: '',
      descripcion: '',
      logo_url: ''
    };
  }
}
