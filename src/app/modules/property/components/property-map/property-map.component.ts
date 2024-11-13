import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as L from 'leaflet';

@Component({
  selector: "app-property-map",
  templateUrl: "./property-map.component.html",
  styleUrls: ["./property-map.component.scss"],
})
export class PropertyMapComponent implements AfterViewInit, OnDestroy {

  private map!: L.Map;
  private icon!: L.Icon;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<PropertyMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { location: string }
  ) {
    this.icon = L.icon({
      iconUrl: 'assets/images/custom-mark.png', 
      iconSize: [38, 38], 
      iconAnchor: [19, 38], 
      popupAnchor: [0, -38]
    });
  }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [41,968456, -0.829422],
      zoom: 13
    });
    this.initLocation();
  }

  async initLocation() {
    const params = new HttpParams()
    .set('q', this.data.location)
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
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '© OpenStreetMap & Propibay'
        }).addTo(this.map);

        L.marker([lat, lon], { icon: this.icon}).addTo(this.map)
          .bindPopup(location.display_name)
          .openPopup();
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

  onClose(): void {
    this.dialogRef.close();
  }
}