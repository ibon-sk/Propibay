import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyMapComponent } from './property-map.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as L from 'leaflet';

class MockMatDialogRef {
  close() {}
}

describe('PropertyMapComponent', () => {
  let component: PropertyMapComponent;
  let fixture: ComponentFixture<PropertyMapComponent>;
  let httpMock: HttpTestingController;
  let dialogRef: MockMatDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PropertyMapComponent],
      providers: [
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { location: 'Zaragoza' } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyMapComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set map view and add marker on successful location fetch', async () => {
    const mockResponse = [{
      lat: '41.968456',
      lon: '-0.829422',
      display_name: 'Zaragoza, España'
    }];
    
    const params = { q: 'Zaragoza', format: 'json', addressdetails: '1', limit: '1' };
    
    component.initLocation();

    const req = httpMock.expectOne((request) => request.url.includes('nominatim.openstreetmap.org/search') && request.params.toString() === new URLSearchParams(params).toString());
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); 
  });

  it('should close the dialog on onClose', () => {
    spyOn(dialogRef, 'close');
    component.onClose();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  afterEach(() => {
    httpMock.verify();
  });
});