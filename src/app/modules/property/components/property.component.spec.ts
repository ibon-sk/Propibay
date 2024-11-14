import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyComponent } from './property.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PropertyController } from '../controllers/property.controller';
import { ChatController } from '../../chat/controllers/chat.controller';
import { OfferController } from '../../offer/controllers/offer.controller';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PropertyMapComponent } from './property-map/property-map.component';
import { Property } from '../../shared/models/property';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { any } from 'cypress/types/bluebird';

describe('PropertyComponent', () => {
  let component: PropertyComponent;
  let fixture: ComponentFixture<PropertyComponent>;
  let mockPropertyController: jasmine.SpyObj<PropertyController>;
  let mockChatController: jasmine.SpyObj<ChatController>;
  let mockOfferController: jasmine.SpyObj<OfferController>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    // Crear espías para los servicios
    mockPropertyController = jasmine.createSpyObj('PropertyController', [
      'getProperty', 'checkFavourite', 'addToFavourites', 'removeFromFavourites'
    ]);
    mockChatController = jasmine.createSpyObj('ChatController', ['sendMessage']);
    mockOfferController = jasmine.createSpyObj('OfferController', ['createOffer']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

    TestBed.configureTestingModule({
      declarations: [ PropertyComponent ],
      imports: [
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: PropertyController, useValue: mockPropertyController },
        { provide: ChatController, useValue: mockChatController },
        { provide: OfferController, useValue: mockOfferController },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open map modal when openMapModal is called', () => {

    component.openMapModal();

    expect(mockDialog.open).toHaveBeenCalledWith(PropertyMapComponent, {
      width: '80%',
      height: '80%',
      data: { location: component.property.ubicacion }
    });
  });

  it('should go back when goBack is called', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should navigate to edit property when navigateToEdit is called', () => {
    component.navigateToEdit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit-property', component.property.id]);
  });

  it('should add property to favourites', () => {
    mockPropertyController.addToFavourites.and.returnValue(Promise.resolve({
        rows: [{
          email: 'unknown@unknown.com',
          ID: component.property.id
        }]
      }));

    component.addToFavourites();

    expect(mockPropertyController.addToFavourites).toHaveBeenCalled();
  });

  it('should remove property from favourites', () => {
    mockPropertyController.removeFromFavourites.and.returnValue(Promise.resolve());

    component.removeFromFavourites();

    expect(mockPropertyController.removeFromFavourites).toHaveBeenCalled();
    expect(component.isFavourite).toBeFalse();
  });
});
