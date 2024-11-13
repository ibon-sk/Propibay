import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../../shared/models/property';
import { API } from '../../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {

    constructor(private http: HttpClient) { }

    getProperty(id: number): Promise<any> {
        return this.http.get<Property>(`${API.ROOT}${API.PROPERTIES}/${id}`).toPromise();
    }

    createProperty(property: Property): Promise<any> {
        const body = {
            email: property.propietario_email,
            id: property.id,
            titulo: property.titulo,
            descripcion: property.descripcion, 
            precio: property.precio,
            extension: property.extension, 
            habitaciones: property.habitaciones, 
            estado: property.estado, 
            tipo_inmueble: property.tipo_propiedad, 
            ubicacion: property.ubicacion, 
            tipo_oferta: property.tipo_oferta,
        };
        return this.http.post(`${API.ROOT}${API.CLIENTS}/${body.email}${API.PROPERTIES}`, body).toPromise();
    }

    updateProperty(property: Property): Promise<any> {
        const body = {
            propietarioEmail: property.propietario_email,
            id: property.id,
            titulo: property.titulo,
            descripcion: property.descripcion, 
            precio: property.precio,
            extension: property.extension, 
            habitaciones: property.habitaciones, 
            estado: property.estado, 
            tipo_inmueble: property.tipo_propiedad, 
            ubicacion: property.ubicacion, 
            tipo_oferta: property.tipo_oferta,
        };
        return this.http.put(`${API.ROOT}${API.PROPERTIES}/${body.id}`, body).toPromise();
    }

    deleteProperty(id: number): Promise<any> {
        return this.http.delete(`${API.ROOT}${API.PROPERTIES}/${id}`).toPromise();
    }

    addToFavourites(email: string, propertyId: number): Promise<any> {
        const body = {
            email: email,
            ID: propertyId
        };

        return this.http.post(`${API.ROOT}${API.CLIENTS}/${email}/favoritos`, body).toPromise();
    }

}
