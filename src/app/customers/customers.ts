import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersService, Customer } from '../services/customers';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers {
  customers: Customer[] = [];
  showModal = false;
  editingCustomer: Customer | null = null;

  formData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: ''
  };

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customersService.getCustomers().subscribe({
      next: (customers) => this.customers = customers,
      error: (error) => console.error('Error loading customers:', error)
    });
  }

  showForm() {
    this.showModal = true;
    this.editingCustomer = null;
    this.resetForm();
  }

  hideForm() {
    this.showModal = false;
    this.editingCustomer = null;
    this.resetForm();
  }

  editCustomer(customer: Customer) {
    this.editingCustomer = customer;
    this.formData = {
      nombre: customer.nombre,
      apellido: customer.apellido,
      email: customer.email,
      telefono: customer.telefono || '',
      direccion: customer.direccion || '',
      ciudad: customer.ciudad || ''
    };
    this.showModal = true;
  }

  saveCustomer() {
    if (this.editingCustomer) {
      this.customersService.updateCustomer(this.editingCustomer.id_cliente, this.formData).subscribe({
        next: () => {
          this.loadCustomers();
          this.hideForm();
        },
        error: (error) => console.error('Error updating customer:', error)
      });
    }
  }

  deleteCustomer(id: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.customersService.deleteCustomer(id).subscribe({
        next: () => this.loadCustomers(),
        error: (error) => console.error('Error deleting customer:', error)
      });
    }
  }

  resetForm() {
    this.formData = {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: ''
    };
  }
}
