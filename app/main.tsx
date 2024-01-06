import RankingSection from "./rankingSect";

//import { useState } from "react";

const Main = () => (
  <div className="w-full">
    <div className="grid grid-cols-12 sm:gap-8">
      <main
        className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12"
        id="main"
      >
        <RankingSection pageType={{ name: "再生数", query: "aveViewers" }} />
      </main>
    </div>
  </div>
);

export default Main;
