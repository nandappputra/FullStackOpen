import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("BlogForm", () => {
  test("should send request to the backend with appropriate parameters", async () => {
    const mockNewBlogHandler = jest.fn();

    render(<BlogForm newBlogHandler={mockNewBlogHandler} />);

    const user = userEvent.setup();

    const title = screen.getByPlaceholderText("title of the blog");
    await user.type(title, "test title");

    const author = screen.getByPlaceholderText("name of the author");
    await user.type(author, "test author");

    const url = screen.getByPlaceholderText("url of the blog");
    await user.type(url, "test url");

    const submitButton = screen.getByText("create");
    await user.click(submitButton);

    expect(mockNewBlogHandler.mock.calls).toHaveLength(1);
    expect(mockNewBlogHandler.mock.calls[0][0]).toEqual({
      title: "test title",
      author: "test author",
      url: "test url",
    });
  });
});
