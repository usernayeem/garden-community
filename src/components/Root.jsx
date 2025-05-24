import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router";
import { Footer } from "./Footer";

export const Root = () => {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-200 bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
