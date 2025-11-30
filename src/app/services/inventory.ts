import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Inventory {
  id_inventario: number;
  id_producto: number;
  talla: number;
  cantidad: number;
  cantidad_minima: number;
  ubicacion?: string;
  producto_nombre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/inventario';

  constructor(private http: HttpClient) {}

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  getInventoryByProduct(productId: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}/producto/${productId}`);
  }

  updateInventory(id: number, inventory: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, inventory);
  }

  addStock(inventory: any): Observable<any> {
    return this.http.post(this.apiUrl, inventory);
  }
}
