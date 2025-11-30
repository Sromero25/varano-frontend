import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    loadComponent: () => import('./admin-layout/admin-layout').then(c => c.AdminLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(c => c.Dashboard) },
      { path: 'products', loadComponent: () => import('./products/products').then(c => c.Products) },
      { path: 'categories', loadComponent: () => import('./categories/categories').then(c => c.Categories) },
      { path: 'brands', loadComponent: () => import('./brands/brands').then(c => c.Brands) },
      { path: 'inventory', loadComponent: () => import('./inventory/inventory').then(c => c.InventoryComponent) },
      { path: 'orders', loadComponent: () => import('./orders/orders').then(c => c.Orders) },
      { path: 'customers', loadComponent: () => import('./customers/customers').then(c => c.Customers) }
    ]
  }
];
