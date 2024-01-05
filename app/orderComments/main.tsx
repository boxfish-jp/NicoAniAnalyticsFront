import Ranking from "@/components/ranking";
import queryRanking from "@/lib/queryRanking";
import { Button } from "@/components/ui/button";
import CustomLink from "@/components/link";

//import { useState } from "react";

const Main = async () => {
  //const [WhichOrder, setWhichOrder] = useState("aveViewers");

  const dbChannels = await queryRanking("aveComments");

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 sm:gap-8">
        <main
          className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12"
          id="main"
        >
          <h1 className="text-center text-3xl mt-20">
            今季アニメの平均コメント数ランキング
          </h1>
          <section className="flex flex-row gap-3 md:gap-12 mx-auto">
            <CustomLink href="/">
              <Button>再生数順</Button>
            </CustomLink>
            <CustomLink href="/orderMylists">
              <Button>マイリスト順</Button>
            </CustomLink>
            <CustomLink href="/orderComments">
              <Button>コメント数順</Button>
            </CustomLink>
          </section>

          <Ranking channels={dbChannels} />
        </main>
      </div>
    </div>
  );
};

export default Main;
