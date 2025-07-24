describe('User Management Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Login with valid credentials', () => {
    cy.get('#email').type('eve.holt@reqres.in');
    cy.get('#password').type('cityslicka');
    cy.get('#login').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login success!');
    });

  });

  it('Login with invalid credentials', () => {
    cy.get('#email').type('invalid@example.com');
    cy.get('#password').type('wrongpassword');
    cy.get('#login').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login failed.');
    });

  });

  it('Create new user and assert it appears in the list', () => {
    cy.get('#createUser').click();

    // Assume alert appears, confirm and close it
    cy.on('window:alert', (str) => {
      expect(str).to.match(/User created: New User \d+/);
    });

    // Assert the last user in the list has a name starting with New User
    cy.get('ul > li').last().invoke('text').then((text) => {
      const nameOnly = text.split('Edit')[0].trim();
      expect(nameOnly).to.match(/^New User \d+$/);
    });
  });

  it('Edit existing user and assert name updates', () => {
    // Load users first
    cy.get('#loadUsers').click();

    // Click edit button for first user in the list
    cy.get('#updateUser').first().click();

    // Confirm alert
    cy.on('window:alert', (str) => {
      expect(str).to.match(/User updated: Updated User \d+/);
    });

    cy.wait(300);

    // Assert the first user's name is updated (strip out button text)
    cy.get('ul > li').first().invoke('text').then((text) => {
      const nameOnly = text.split('Edit')[0].trim();
      expect(nameOnly).to.match(/^Updated User \d+$/);
    });
  });

  it('Deletes George Bluth and asserts he is removed from the list', () => {
    // Load users first
    cy.get('#loadUsers').click();

    // Confirm George Bluth exists
    cy.contains('George Bluth').should('exist');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('User deleted');
    });

    // Click the delete button next to George Bluth
    cy.get('#deleteUser').first().click();

    // Assert George Bluth no longer exists
    cy.contains('George Bluth').should('not.exist');
  });
});