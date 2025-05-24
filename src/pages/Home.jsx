import React from "react";
import { Banner } from "../components/Banner";
import { Gardeners } from "../components/gardeners";
import { Guide } from "../components/Guide";
import { Achievements } from "../components/Achievements";
import TrendingTips from "../components/TrendingTips";

export const Home = () => {
  return (
    <div>
      <Banner />
      <TrendingTips />
      <Gardeners />
      <Guide />
      <Achievements />
    </div>
  );
};
