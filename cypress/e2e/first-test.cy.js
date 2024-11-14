describe('Full Flow Test', () => {
  const user = {
    name: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'Password123!'
  };

  const property = {
    title: 'Test Property',
    description: 'This is a test property',
    type: 1, 
    offerType: 0, 
    extension: 100,
    state: 1,
    rooms: '3',
    price: '100000',
    location: 'Zaragoza'
  };

  before(() => {
    cy.visit('/create-account');

    cy.get('input[formControlName="name"]').type(user.name);
    cy.get('input[formControlName="lastName"]').type(user.lastName);
    cy.get('input[formControlName="email"]').type(user.email);
    cy.get('input[formControlName="password"]').type(user.password);
    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', '/login');
    cy.get('input[formControlName="email"]').type(user.email);
    cy.get('input[formControlName="password"]').type(user.password);
    cy.get('button[type="submit"]').should('be.visible').click();

    cy.url().should('include', '/home');
  });

  it('should create a property', () => {
    cy.visit('/create-property');
    cy.get('input[formControlName="title"]').type(property.title);
    cy.get('textarea[formControlName="description"]').type(property.description);
    cy.get('select[formControlName="type"]').select(property.type);
    cy.get('select[formControlName="offerType"]').select(property.offerType);
    cy.get('input[formControlName="extension"]').type(property.extension.toString());
    cy.get('input[formControlName="state"]').type(property.state.toString());
    cy.get('input[formControlName="rooms"]').type(property.rooms);
    cy.get('input[formControlName="price"]').type(property.price);
    cy.get('input[formControlName="location"]').type(property.location);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/home');
  });

  it('should navigate to my properties and edit the property', () => {
    cy.visit('/profile/my-properties');
    cy.get('button').contains('Editar').click();

    cy.get('input[formControlName="title"]').clear().type('Updated Test Property');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/profile/my-properties');
  });

  it('should add a property to favourites, create an offer, and create a chat', () => {
    cy.visit('/home');
    cy.get('button').contains('Ver').click();

    cy.get('button').contains('Añadir a favoritos').click();
    cy.get('button').contains('Realizar oferta').click();
    cy.get('input[formControlName="amount"]').type('50000');
    cy.get('button[type="submit"]').click();

    cy.get('button').contains('Contactar con el propietario').click();
    cy.get('textarea[formControlName="message"]').type('Hola, estoy interesado en tu propiedad.');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/chat');
  });

  it('should reject the offer and delete the property', () => {
    cy.visit('/offers');
    cy.get('button').contains('Rechazar').click();

    cy.visit('/profile/my-properties');
    cy.get('button').contains('Eliminar').click();
  });

  it('should delete the account', () => {
    cy.visit('/profile');
    cy.get('button').contains('Eliminar cuenta').click();
    cy.get('button').contains('Confirmar').click();

    cy.url().should('include', '/login');
  });
});