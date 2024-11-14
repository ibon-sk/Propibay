import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffersComponent } from './offers.component';
import { OfferController } from '../controllers/offer.controller';
import { PropertyController } from '../../property/controllers/property.controller';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockOfferController {
  getOffersByClient(email: string) {
    return Promise.resolve([
      { id_oferta: 1, propiedad_id: 101, cliente_email: 'client@example.com', dinero_oferta: 1000 },
      { id_oferta: 2, propiedad_id: 102, cliente_email: 'client2@example.com', dinero_oferta: 1500 }
    ]);
  }
  
  getOffersByOwner(email: string) {
    return Promise.resolve([
      { id_oferta: 3, propiedad_id: 101, cliente_email: 'client@example.com', dinero_oferta: 1000 },
      { id_oferta: 4, propiedad_id: 103, cliente_email: 'client3@example.com', dinero_oferta: 1200 }
    ]);
  }
  
  createSell(email: string, offerer: string, property_id: number, price: number) {
    return Promise.resolve();
  }
  
  deleteOffer(id_oferta: number) {
    return Promise.resolve();
  }
}

class MockPropertyController {
  getProperty(propertyId: number) {
    return Promise.resolve({ id: propertyId, title: `Property ${propertyId}` });
  }
}

describe('OffersComponent', () => {
  let component: OffersComponent;
  let fixture: ComponentFixture<OffersComponent>;
  let mockOfferController: MockOfferController;
  let mockPropertyController: MockPropertyController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffersComponent],
      providers: [
        { provide: OfferController, useClass: MockOfferController },
        { provide: PropertyController, useClass: MockPropertyController }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OffersComponent);
    component = fixture.componentInstance;
    mockOfferController = TestBed.inject(OfferController);
    mockPropertyController = TestBed.inject(PropertyController);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load sent and received offers on init', async () => {
    spyOn(mockOfferController, 'getOffersByClient').and.callThrough();
    spyOn(mockOfferController, 'getOffersByOwner').and.callThrough();
    spyOn(mockPropertyController, 'getProperty').and.callThrough();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(mockOfferController.getOffersByClient).toHaveBeenCalledWith(component.email);
    expect(mockOfferController.getOffersByOwner).toHaveBeenCalledWith(component.email);
    expect(mockPropertyController.getProperty).toHaveBeenCalledWith(101);
    expect(mockPropertyController.getProperty).toHaveBeenCalledWith(102);
    expect(mockPropertyController.getProperty).toHaveBeenCalledWith(103);
    expect(component.sentOffers.length).toBe(2);
    expect(component.receivedOffers.length).toBe(2);
  });

  it('should accept an offer and create a sell', async () => {
    spyOn(mockOfferController, 'createSell').and.callThrough();
    spyOn(mockOfferController, 'deleteOffer').and.callThrough();

    const offer = { id_oferta: 1, propiedad_id: 101, cliente_email: 'unknown@unknown.com', dinero_oferta: 1000 };
    await component.acceptOffer(offer);

    expect(mockOfferController.createSell).toHaveBeenCalledWith(component.email, offer.cliente_email, offer.propiedad_id, offer.dinero_oferta);
    expect(mockOfferController.deleteOffer).toHaveBeenCalledWith(offer.id_oferta);
  });

  it('should delete an offer', async () => {
    spyOn(mockOfferController, 'deleteOffer').and.callThrough();

    const id_oferta = 2;
    await component.deleteOffer({ id_oferta, propiedad_id: 101, cliente_email: '', dinero_oferta: 1000 });

    expect(mockOfferController.deleteOffer).toHaveBeenCalledWith(id_oferta);
  });

  it('should call deleteOffer when offer is deleted', async () => {
    spyOn(mockOfferController, 'deleteOffer').and.callThrough();

    const offer = { id_oferta: 1, propiedad_id: 101, cliente_email: 'unknown@unknown.com', dinero_oferta: 1000 };
    await component.deleteOffer(offer);

    expect(mockOfferController.deleteOffer).toHaveBeenCalledWith(offer.id_oferta);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
