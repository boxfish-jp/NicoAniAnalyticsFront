import Ranking from "@/components/ranking";
import ButtonLists from "@/components/buttonLists";
import queryOldRanking from "@/lib/queryOldRanking";
import PreviRankingPagination from "./previRankingPagination";
import rankingCardSize from "@/data/rankingCardSize";
import { querySeasons } from "@/lib/querySeason";
import lastUpdateDay from "@/lib/lastUpdateDay";

const PreviousRankingSection = async ({
  pageType,
}: {
  pageType: { name: string; query: string; offset: number };
}) => {
  const seasons = await querySeasons();
  const season = seasons[seasons.length - 2];
  const lastUpdate = lastUpdateDay(season.syear, season.sseason);
  const queryChannels = await queryOldRanking(
    pageType.query,
    pageType.offset,
    season.syear,
    season.sseason,
    lastUpdate
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
        {season.sdesc}平均{pageType.name}ランキング
      </h1>
      <p className="text-center">
        本日までに各チャンネルで投稿されているすべての動画の{pageType.name}
        を平均したデータを集計しております。
      </p>
      <p className="text-center" style={{ marginTop: "-8px" }}>
        最終更新日：{lastUpdate.toDateString()}
      </p>
      <ButtonLists
        links={[
          { href: "/previous", name: "再生数順" },
          { href: "/previous?name=マイリスト数", name: "マイリスト数順" },
          { href: "/previous?name=コメント数", name: "コメント数順" },
        ]}
      />
      <PreviRankingPagination
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
      <PreviRankingPagination
        type={pageType.name}
        previouseOffset={previouseOffset}
        nextOffset={nextOffset}
        numCh={numCh}
      />
    </>
  );
};

export default PreviousRankingSection;
