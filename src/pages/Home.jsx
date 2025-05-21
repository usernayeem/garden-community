import React from "react";
import { Banner } from "../components/Banner";
import { Gardeners } from "../components/gardeners";
import { Tips } from "../components/Tips";

export const Home = () => {
  return (
    <div>
      <Banner />
      <Gardeners />
      <Tips />
    </div>
  );
};
