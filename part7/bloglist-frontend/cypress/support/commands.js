Cypress.Commands.add("createUser", ({ username, name, password }) => {
  cy.request("POST", "http://localhost:3003/api/users", {
    username,
    name,
    password,
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then((response) => {
    window.localStorage.setItem("loginInfo", JSON.stringify(response.body));
  });
});
