describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    cy.createUser({ username: "testing", name: "test user", password: "123" });

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testing");
      cy.get("#password").type("123");
      cy.get("#login-button").click();

      cy.contains("User test user is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testing");
      cy.get("#password").type("1234 wrong");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });
});
