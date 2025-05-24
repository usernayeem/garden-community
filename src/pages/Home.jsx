import React from "react";
import { Banner } from "../components/Banner";
import { Guide } from "../components/Guide";
import { Achievements } from "../components/Achievements";
import TrendingTips from "../components/TrendingTips";
import { FeaturedGardeners } from "../components/FeaturedGardeners";

export const Home = () => {
  return (
    <div>
      <Banner />
      <TrendingTips />
      <FeaturedGardeners />
      <Guide />
      <Achievements />
    </div>
  );
};
