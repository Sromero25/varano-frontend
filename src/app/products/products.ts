import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from '../services/products';
import { CategoriesService } from '../services/categories';
import { BrandsService } from '../services/brands';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  brands: any[] = [];
  showModal = false;
  editingProduct: Product | null = null;

  formData = {
    nombre: '',
    descripcion: '',
    precio: 0,
    precio_descuento: 0,
    id_categoria: 0,
    id_marca: 0,
    material: '',
    color: '',
    genero: 'Unisex',
    destacado: false
  };

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private brandsService: BrandsService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.loadBrands();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (error) => console.error('Error loading products:', error)
    });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  loadBrands() {
    this.brandsService.getBrands().subscribe({
      next: (brands) => this.brands = brands,
      error: (error) => console.error('Error loading brands:', error)
    });
  }

  showForm() {
    this.showModal = true;
    this.editingProduct = null;
    this.resetForm();
  }

  hideForm() {
    this.showModal = false;
    this.editingProduct = null;
    this.resetForm();
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.formData = {
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      precio_descuento: product.precio_descuento || 0,
      id_categoria: product.id_categoria,
      id_marca: product.id_marca,
      material: product.material || '',
      color: product.color || '',
      genero: product.genero,
      destacado: product.destacado
    };
    this.showModal = true;
  }

  saveProduct() {
    if (this.editingProduct) {
      this.productsService.updateProduct(this.editingProduct.id_producto, this.formData).subscribe({
        next: () => {
          this.loadProducts();
          this.hideForm();
        },
        error: (error) => console.error('Error updating product:', error)
      });
    } else {
      this.productsService.createProduct(this.formData).subscribe({
        next: () => {
          this.loadProducts();
          this.hideForm();
        },
        error: (error) => console.error('Error creating product:', error)
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (error) => console.error('Error deleting product:', error)
      });
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id_categoria === categoryId);
    return category ? category.nombre : 'N/A';
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.id_marca === brandId);
    return brand ? brand.nombre : 'N/A';
  }

  resetForm() {
    this.formData = {
      nombre: '',
      descripcion: '',
      precio: 0,
      precio_descuento: 0,
      id_categoria: 0,
      id_marca: 0,
      material: '',
      color: '',
      genero: 'Unisex',
      destacado: false
    };
  }
}
