import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../../shared/models/property';
import { API } from '../../shared/constants';
import { PropertyFilter } from '../../shared/models/property-filter';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    
    constructor(private http: HttpClient) { }

    getProperties(): Promise<any> {
        return this.http.get<Property[]>(`${API.ROOT}${API.PROPERTIES}`).toPromise();
    }

    getPropertiesByFilter(filter: PropertyFilter): Promise<any> {
      const body = {
        precioMin: filter.precioMin, 
        precioMax: filter.precioMax, 
        extension: filter.extension, 
        nHabitaciones: filter.nHabitaciones, 
        estado: filter.estado, 
        tipoInmueble: filter.tipoInmueble, 
        tipoOferta: filter.tipoOferta, 
        ordenarPrecioMax: filter.ordenarPrecioMax, 
        ordenarPrecioMin: filter.ordenarPrecioMin, 
        ordenarFavoritos: filter.ordenarFavoritos
      }
      return this.http.post<Property[]>(`${API.ROOT}${API.PROPERTIES}/buscar`, body).toPromise();
    }
}
