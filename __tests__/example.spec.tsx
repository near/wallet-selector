import React from "react";
import { render } from "@testing-library/react";

it("works", () => {
  const component = render(
    <div>
      <span>Hello World!</span>
    </div>
  );
  const text = component.getByText("Hello World!");

  expect(text).toBeInTheDocument();
});
