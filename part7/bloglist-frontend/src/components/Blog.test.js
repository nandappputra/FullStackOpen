import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog", () => {
  test("should only render title and author by default", async () => {
    const blog = {
      title: "testing",
      author: "me",
      likes: 30,
      url: "hehehe.com",
    };

    const mockLikeBlock = jest.fn();
    const mockRemoveBlogFromList = jest.fn();

    const { container } = render(
      <Blog
        blog={blog}
        likeBlog={mockLikeBlock}
        removeBlogFromList={mockRemoveBlogFromList}
      />
    );

    const element = container.querySelector(".blog");

    expect(element.textContent).toContain("testing");
    expect(element.textContent).toContain("me");
    expect(element.textContent).not.toContain("30");
    expect(element.textContent).not.toContain("hehehe.com");
  });

  test("should render likes and url after the view button is clicked", async () => {
    const blog = {
      title: "testing",
      author: "me",
      likes: 30,
      url: "hehehe.com",
    };

    const mockLikeBlock = jest.fn();
    const mockRemoveBlogFromList = jest.fn();

    const { container } = render(
      <Blog
        blog={blog}
        likeBlog={mockLikeBlock}
        removeBlogFromList={mockRemoveBlogFromList}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const element = container.querySelector(".blog");

    expect(element.textContent).toContain("testing");
    expect(element.textContent).toContain("me");
    expect(element.textContent).toContain("30");
    expect(element.textContent).toContain("hehehe.com");
  });

  test("should send every like button click to backend", async () => {
    const blog = {
      title: "testing",
      author: "me",
      likes: 30,
      url: "hehehe.com",
    };

    const mockLikeBlock = jest.fn();
    const mockRemoveBlogFromList = jest.fn();

    const { container } = render(
      <Blog
        blog={blog}
        likeBlog={mockLikeBlock}
        removeBlogFromList={mockRemoveBlogFromList}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeBlock.mock.calls).toHaveLength(2);
  });
});
