import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService, Order } from '../services/orders';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe({
      next: (orders) => this.orders = orders,
      error: (error) => console.error('Error loading orders:', error)
    });
  }

  updateOrderStatus(orderId: number, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;

    this.ordersService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => this.loadOrders(),
      error: (error) => console.error('Error updating order:', error)
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pendiente': return 'bg-warning';
      case 'confirmado': return 'bg-info';
      case 'en_proceso': return 'bg-primary';
      case 'enviado': return 'bg-secondary';
      case 'entregado': return 'bg-success';
      case 'cancelado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pendiente': 'Pendiente',
      'confirmado': 'Confirmado',
      'en_proceso': 'En Proceso',
      'enviado': 'Enviado',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
    return statusMap[status] || status;
  }
}
