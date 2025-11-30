import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService, Category } from '../services/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html'
})
export class Categories implements OnInit {
  categories: Category[] = [];
  showModal = false;
  editingCategory: Category | null = null;

  formData = {
    nombre: '',
    descripcion: ''
  };

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  showForm() {
    this.showModal = true;
    this.editingCategory = null;
    this.resetForm();
  }

  hideForm() {
    this.showModal = false;
    this.editingCategory = null;
    this.resetForm();
  }

  editCategory(category: Category) {
    this.editingCategory = category;
    this.formData = {
      nombre: category.nombre,
      descripcion: category.descripcion || ''
    };
    this.showModal = true;
  }

  saveCategory() {
    if (this.editingCategory) {
      this.categoriesService.updateCategory(this.editingCategory.id_categoria, this.formData).subscribe({
        next: () => {
          this.loadCategories();
          this.hideForm();
        },
        error: (error) => console.error('Error updating category:', error)
      });
    } else {
      this.categoriesService.createCategory(this.formData).subscribe({
        next: () => {
          this.loadCategories();
          this.hideForm();
        },
        error: (error) => console.error('Error creating category:', error)
      });
    }
  }

  deleteCategory(id: number) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriesService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (error) => console.error('Error deleting category:', error)
      });
    }
  }

  resetForm() {
    this.formData = {
      nombre: '',
      descripcion: ''
    };
  }
}
