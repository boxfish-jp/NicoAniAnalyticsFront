import Ranking from "@/components/ranking";
import ButtonLists from "@/components/buttonLists";
import queryRanking from "@/lib/queryRanking";
import CustomLink from "@/components/link";

const RankingSection = async ({
  pageType,
}: {
  pageType: { name: string; query: string; offset: number };
}) => {
  const dbChannels = await queryRanking(pageType.query, pageType.offset);
  const previouseOffset = pageType.offset - 10 > 0 ? pageType.offset - 10 : 0;
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
          { href: "/orderMylists", name: "マイリスト順" },
          { href: "/orderComments", name: "コメント数順" },
        ]}
      />

      <Ranking channels={dbChannels} offset={pageType.offset} />

      <div className="flex gap-20 mx-auto">
        <CustomLink href={"/?offset=" + previouseOffset}>
          <p>前へ</p>
        </CustomLink>
        <CustomLink href={"/?offset=" + nextOffset}>
          <p>次へ</p>
        </CustomLink>
      </div>
    </>
  );
};

export default RankingSection;
