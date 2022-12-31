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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testing", password: "123" });

      cy.visit("http://localhost:3000");
    });

    it("A blog can be created", function () {
      cy.get("#mark-as-visible").click();

      cy.get("#blog-title").type("testing");
      cy.get("#blog-author").type("testing");
      cy.get("#blog-url").type("testing");

      cy.get("#blog-submit").click();

      cy.contains("New blog added: testing");
    });

    it("A blog can be liked", function () {
      cy.get("#mark-as-visible").click();

      cy.get("#blog-title").type("testing");
      cy.get("#blog-author").type("testing");
      cy.get("#blog-url").type("testing");

      cy.get("#blog-submit").click();

      cy.contains("view").click();
      cy.contains("like").click();

      cy.contains("1");
    });

    it("A blog can be deleted", function () {
      cy.get("#mark-as-visible").click();

      cy.get("#blog-title").type("testing blog");
      cy.get("#blog-author").type("testing");
      cy.get("#blog-url").type("testing");

      cy.get("#blog-submit").click();

      cy.contains("view").click();
      cy.contains("delete").click();

      cy.get(".blog").should("not.exist");
    });
  });
});
