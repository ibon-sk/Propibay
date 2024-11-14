import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { Router } from '@angular/router';
import { ProfileController } from '../controllers/profile.controller';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockController: jasmine.SpyObj<ProfileController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ProfileController, useValue: mockController },
        { provide: MatDialog, useValue: mockDialog }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockController = jasmine.createSpyObj('ProfileController', ['getProfile', 'updateProfile', 'deleteProfile']);
    mockController.getProfile.and.returnValue(Promise.resolve({ nombre: 'mock', apellidos: 'mock' }));
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get user profile on init', async () => {
    spyOn(localStorage, 'getItem').and.returnValue('email@email.com');
    component.ngOnInit();
    expect(component.email).toBe('email@email.com');
  });

  it('should validate if username is empty', () => {
    component.fullName = '';
    component.validateUsername();
    expect(component.isUsernameEmpty).toBeTrue();

    component.fullName = 'mock mock';
    component.validateUsername();
    expect(component.isUsernameEmpty).toBeFalse();
  });

  it('should toggle editing mode', () => {
    expect(component.isEditing).toBeFalse();
    component.toggleEdit();
    expect(component.isEditing).toBeTrue();
    component.toggleEdit();
    expect(component.isEditing).toBeFalse();
  });

  it('should not save username if empty', () => {
    component.fullName = '';
    component.saveUsername();
    expect(component.isUsernameEmpty).toBeTrue();
  });

  it('should navigate to manage apartments', () => {
    component.manageApartments();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile/my-properties']);
  });

  it('should navigate to view favorites history', () => {
    component.viewFavoritesHistory();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile/my-favourites']);
  });

  it('should log out and clear localStorage', () => {
    spyOn(localStorage, 'clear');
    component.logout();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
