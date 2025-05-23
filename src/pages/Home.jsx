import React from "react";
import { Banner } from "../components/Banner";
import { Gardeners } from "../components/gardeners";
import { Guide } from "../components/Guide";
import { Achievements } from "../components/Achievements";

export const Home = () => {
  return (
    <div>
      <Banner />
      <Gardeners />
      <Guide />
      <Achievements />
    </div>
  );
};
