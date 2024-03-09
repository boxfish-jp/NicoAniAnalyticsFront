import Ranking from "@/components/ranking";
import ButtonLists from "@/components/buttonLists";
import queryRanking from "@/lib/queryRanking";
import CustomLink from "@/components/link";
import RankingPagination from "./rankingPagination";
import rankingCardSize from "@/data/rankingCardSize";
import { queryLatestSeason } from "@/lib/querySeason";

const RankingSection = async ({
  pageType,
}: {
  pageType: { name: string; query: string; offset: number };
}) => {
  const season = await queryLatestSeason();
  const queryChannels = await queryRanking(
    pageType.query,
    pageType.offset,
    season.syear,
    season.sseason
  );
  const dbChannels = queryChannels.channels;
  const numCh = queryChannels.chAmount;
  const previouseOffset =
    pageType.offset - rankingCardSize > 0
      ? pageType.offset - rankingCardSize
      : 0;
  const nextOffset = pageType.offset + 10;
  return (
    <>
      <h1 className="text-center text-3xl mt-20">
        今季のアニメ平均{pageType.name}ランキング
      </h1>
      <p className="text-center">
        本日までに各チャンネルで投稿されているすべての動画の{pageType.name}
        を平均したデータを集計しております。
      </p>
      <ButtonLists
        links={[
          { href: "/", name: "再生数順" },
          { href: "/?name=マイリスト数", name: "マイリスト数順" },
          { href: "/?name=コメント数", name: "コメント数順" },
        ]}
      />
      <RankingPagination
        type={pageType.name}
        previouseOffset={previouseOffset}
        nextOffset={nextOffset}
        numCh={numCh}
      />
      <Ranking
        type={pageType.name}
        query={pageType.query}
        channels={dbChannels}
      />
      <RankingPagination
        type={pageType.name}
        previouseOffset={previouseOffset}
        nextOffset={nextOffset}
        numCh={numCh}
      />
    </>
  );
};

export default RankingSection;
