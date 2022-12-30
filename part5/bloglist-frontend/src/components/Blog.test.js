import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog", () => {
  test("should only render title and author by default", async () => {
    const blog = {
      title: "testing",
      author: "me",
      likes: 30,
      url: "hehehe.com",
    };

    const mockRemoveBlogFromList = jest.fn();

    const { container } = render(
      <Blog blog={blog} removeBlogFromList={mockRemoveBlogFromList} />
    );

    const element = container.querySelector(".blog");

    expect(element.textContent).toContain("testing");
    expect(element.textContent).toContain("me");
    expect(element.textContent).not.toContain("30");
    expect(element.textContent).not.toContain("hehehe.com");
  });
});
