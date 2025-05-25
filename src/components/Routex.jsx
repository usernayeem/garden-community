import { createBrowserRouter } from "react-router";

import React from "react";
import { Root } from "./Root";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgetPass } from "../pages/ForgetPass";
import { ShareTip } from "../pages/ShareTip";
import { BrowseTips } from "../pages/BrowseTips";
import { TipDetails } from "../pages/TipDetails";
import { MyTips } from "../pages/MyTips";
import { UpdateTip } from "../pages/UpdateTip";
import { PrivateRoute } from "./PrivateRoute";
import { ExploreGardeners } from "../pages/ExploreGardeners";
import { NotFound } from "../pages/NotFound";

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
        element: (
          <PrivateRoute>
            <ShareTip />
          </PrivateRoute>
        )
      },
      {
        path: "/browse-tips",
        element: <BrowseTips />
      },
      {
        path: "/tip-details/:id",
        element: (
          <PrivateRoute>
            <TipDetails />
          </PrivateRoute>
        )
      },
      {
        path: "/my-tips",
        element: (
          <PrivateRoute>
            <MyTips />
          </PrivateRoute>
        )
      },
      {
        path: "/update-tip/:id",
        element: (
          <PrivateRoute>
            <UpdateTip />
          </PrivateRoute>
        )
      },
      {
        path: "/explore-gardeners",
        element: <ExploreGardeners />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
