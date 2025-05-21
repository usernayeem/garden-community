import { createBrowserRouter } from "react-router";

import React from "react";
import { Root } from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  }
]);
