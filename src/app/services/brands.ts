import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Brand {
  id_marca: number;
  nombre: string;
  descripcion: string;
  logo_url: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private apiUrl = 'http://localhost:3000/marcas';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  createBrand(brand: any): Observable<any> {
    return this.http.post(this.apiUrl, brand);
  }

  updateBrand(id: number, brand: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
