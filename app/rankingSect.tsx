import Ranking from "@/components/ranking";
import ButtonLists from "@/components/buttonLists";
import queryRanking from "@/lib/queryRanking";

const RankingSection = async ({
  pageType,
}: {
  pageType: { name: string; query: string };
}) => {
  const dbChannels = await queryRanking(pageType.query);
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
          { href: "/orderMylists", name: "マイリスト順" },
          { href: "/orderComments", name: "コメント数順" },
        ]}
      />

      <Ranking channels={dbChannels} />
    </>
  );
};

export default RankingSection;
