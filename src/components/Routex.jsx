import { createBrowserRouter } from "react-router";

import React from "react";
import { Root } from "./Root";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgetPass } from "../pages/ForgetPass";
import { ShareTip } from "../pages/ShareTip";
import BrowseTips from "../pages/BrowseTips";
import { TipDetails } from "../pages/TipDetails";
import { MyTips } from "../pages/MyTips";
import { UpdateTip } from "../pages/UpdateTip";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/forget-password",
        element: <ForgetPass />
      },
      {
        path: "/share-tip",
        element: <ShareTip />
      },
      {
        path: "/browse-tips",
        element: <BrowseTips />
      },
      {
        path: "/tip-details/:id",
        element: <TipDetails />
      },
      {
        path: "/my-tips",
        element: <MyTips />
      },
      {
        path: "/update-tip/:id",
        element: <UpdateTip />
      }
    ]
  }
]);
