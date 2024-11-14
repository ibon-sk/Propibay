import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../shared/constants';
import { Offer } from '../../shared/models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  getOffersByClient(email: string): Promise<any> {
    return this.http.get(`${API.ROOT}${API.OFFERS}/${email}`).toPromise();
  }

  getOffersByOwner(email: string): Promise<any> {
    return this.http.get(`${API.ROOT}${API.OFFERS}/propietario/${email}`).toPromise();
  }

  createOffer(offer: Offer): Promise<any> {
    const body = {
        clienteEmail: offer.cliente_email, 
        propiedadID: offer.propiedad_id, 
        precioInicial: offer.dinero_oferta
    }

    return this.http.post(`${API.ROOT}${API.OFFERS}`, body).toPromise();
  }

  updateOffer(offer: Offer): Promise<any> {
    const body = {
        idOferta: offer.id_oferta,
        clienteEmail: offer.cliente_email, 
        propiedadID: offer.propiedad_id, 
        dineroOferta: offer.dinero_oferta
    }

    return this.http.put(`${API.ROOT}${API.OFFERS}`, body).toPromise();
  }

  deleteOffer(id: number): Promise<any> {
    return this.http.delete(`${API.ROOT}${API.OFFERS}/${id}`).toPromise();
  }

  createSell(owner: string, offerer: string, property_id: number, price: number): Promise<any> {
    const body = {
      clienteEmail: owner, 
      clienteEmail2: offerer, 
      propiedadID: property_id, 
      precioFinal: price
    }

    return this.http.post(`${API.ROOT}${API.SELLS}`, body).toPromise();
  }
}