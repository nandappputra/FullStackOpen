Cypress.Commands.add("createUser", ({ username, name, password }) => {
  cy.request("POST", "http://localhost:3003/api/users", {
    username,
    name,
    password,
  });
});
