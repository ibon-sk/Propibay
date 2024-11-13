import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyController } from '../../controllers/property.controller';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit, AfterViewInit, OnDestroy {
  propertyForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    type: ['', [Validators.required]],
    offerType: ['', [Validators.required]],
    extension: [100, [Validators.required, Validators.min(100)]],
    state: [1, [Validators.required]],
    rooms: [1, [Validators.required, Validators.min(1)]],
    price: [1000, [Validators.required, Validators.min(1000)]],
    location: ['', [Validators.required]]
  });
  propertyTypes: string[] = [];
  listingTypes: string[] = [];
  private map!: L.Map;
  private icon!: L.Icon;

  constructor(
    private fb: FormBuilder, 
    private controller: PropertyController,
    private location: Location,
    private http: HttpClient
  ) {
    this.icon = L.icon({
      iconUrl: 'assets/images/custom-mark.png', 
      iconSize: [38, 38], 
      iconAnchor: [19, 38], 
      popupAnchor: [0, -38]
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [41.648823, -0.889085],
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '© OpenStreetMap & Propibay'
    }).addTo(this.map);
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.propertyForm.markAllAsTouched();
    if (this.propertyForm.valid) {
      const property = {
        propietario_email: localStorage.getItem('email') || '',
        id: Math.floor(Math.random() * 1000000),
        imagenes: [],
        titulo: this.propertyForm.get('title')?.value,
        descripcion: this.propertyForm.get('description')?.value,
        tipo_propiedad: this.propertyForm.get('type')?.value,
        tipo_oferta: this.propertyForm.get('offerType')?.value,
        extension: this.propertyForm.get('extension')?.value,
        estado: this.propertyForm.get('state')?.value,
        habitaciones: this.propertyForm.get('rooms')?.value,
        precio: this.propertyForm.get('price')?.value,
        ubicacion: this.propertyForm.get('location')?.value
      }
      this.controller.createProperty(property);
    }
  }

  async searchLocation(address: string) {
    const params = new HttpParams()
    .set('q', address)
    .set('format', 'json')
    .set('addressdetails', '1')
    .set('limit', '1');

    try {
      const response: any = await this.http.get(
        'https://nominatim.openstreetmap.org/search', 
        { params }
      ).toPromise();

      if (response && response.length > 0) {
        const location = response[0];
        const lat = parseFloat(location.lat);
        const lon = parseFloat(location.lon);

        this.map.setView([lat, lon], 13);

        L.marker([lat, lon], { icon: this.icon}).addTo(this.map)
          .bindPopup(location.display_name)
          .openPopup();
      } else {
        console.error('No location found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
