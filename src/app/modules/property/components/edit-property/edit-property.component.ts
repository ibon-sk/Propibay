import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PropertyController } from "../../controllers/property.controller";
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material/dialog";
import { DeleteModalComponent } from "src/app/modules/shared/components/delete-modal/delete-modal.component";
import { Property } from "src/app/modules/shared/models/property";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import * as L from 'leaflet';

@Component({
  selector: "app-edit-property",
  templateUrl: "./edit-property.component.html",
  styleUrls: ["./edit-property.component.scss"],
})
export class EditPropertyComponent implements OnInit, OnDestroy {
  propertyForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    type: ['', [Validators.required]],
    offerType: ['', [Validators.required]],
    extension: ['', [Validators.required, Validators.min(10)]],
    state: ['', [Validators.required]],
    rooms: ['', [Validators.required, Validators.min(1)]],
    price: ['', [Validators.required]],
    location: ['', [Validators.required]]
  });
  propertyTypes: string[] = [];
  listingTypes: string[] = [];
  property!: Property;
  private map!: L.Map;
  private icon!: L.Icon;
  private currentMarker!: L.Marker;

  constructor(private fb: FormBuilder, 
    private controller: PropertyController,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.icon = L.icon({
      iconUrl: 'assets/images/custom-mark.png', 
      iconSize: [38, 38], 
      iconAnchor: [19, 38], 
      popupAnchor: [0, -38]
    });
  }

  ngOnInit(): void {
    let id: number = 0;
    this.route.params.subscribe((params) => {
      id = +params['id'];
    });
    this.controller.getProperty(id).then((property: Property) => {
      this.property = property;
      this.propertyForm.patchValue({
        title: property.titulo,
        description: property.descripcion,
        type: property.tipo_propiedad,
        offerType: property.tipo_oferta,
        extension: property.extension,
        state: property.estado,
        rooms: property.habitaciones,
        price: property.precio,
        location: property.ubicacion
      });
      if(property.ubicacion !== null) {
        this.searchLocation(this.property.ubicacion);
      }
    });
  }

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

  onSubmit() {
    this.propertyForm.markAllAsTouched();
    if (this.propertyForm.valid) {
      const property = {
        propietario_email: localStorage.getItem('email') || '',
        id: this.property.id,
        imagenes: this.property.imagenes,
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
      this.controller.updateProperty(property).then(() => {
        this.location.back();
      });
    }
  }

  goBack() {
    this.location.back();
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

        this.map.setView([lat, lon], 15);

        if (this.currentMarker) {
          this.map.removeLayer(this.currentMarker);
        }

        this.currentMarker = L.marker([lat, lon], { icon: this.icon}).addTo(this.map)
          .bindPopup(location.display_name)
          .openPopup();
        this.propertyForm.get('location')?.setValue(location.display_name);
      } else {
        console.error('No location found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) this.controller.deleteProperty(this.property.id).then(() => {
        this.location.back();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}