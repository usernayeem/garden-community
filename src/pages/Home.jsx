import React from "react";
import { Banner } from "../components/Banner";
import { Gardeners } from "../components/gardeners";
import { Tips } from "../components/Tips";
import { Guide } from "../components/Guide";
import { Achievements } from "../components/Achievements";

export const Home = () => {
  return (
    <div>
      <Banner />
      <Gardeners />
      <Tips />
      <Guide />
      <Achievements />
    </div>
  );
};
