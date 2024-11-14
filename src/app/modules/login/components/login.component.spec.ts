import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginController } from '../controllers/login.controller';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginControllerSpy: jasmine.SpyObj<LoginController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginControllerMock = jasmine.createSpyObj('LoginController', ['adminLogin', 'login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: LoginController, useValue: loginControllerMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginControllerSpy = TestBed.inject(LoginController) as jasmine.SpyObj<LoginController>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with empty fields', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should mark form as invalid if fields are empty', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should mark form as valid if fields are filled correctly', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call adminLogin on submit if form is valid', async () => {
    component.loginForm.setValue({ email: 'admin@example.com', password: 'password123' });
    loginControllerSpy.adminLogin.and.returnValue(Promise.resolve({ token: 'admin-token' }));

    await component.onSubmit();

    expect(loginControllerSpy.adminLogin).toHaveBeenCalledWith('admin@example.com', 'password123');
    expect(localStorage.getItem('adminToken')).toBe('admin-token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should navigate to create account on click', () => {
    component.onClickCreateAccount();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/create-account']);
  });
});
