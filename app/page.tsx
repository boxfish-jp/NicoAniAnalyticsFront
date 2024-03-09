import Header from "@/components/header";
import RankingSection from "./rankingSect";

export const runtime = "edge";

const Home = (props: {
  params: {};
  searchParams: { offset?: number; name?: string };
}) => {
  const offset = Number(props.searchParams.offset) || 0;
  const name = props.searchParams.name || "再生数";
  let query: string;
  switch (name) {
    case "再生数":
      query = "r_ave_view_rank";
      break;
    case "コメント数":
      query = "r_ave_comment_rank";
      break;
    case "マイリスト数":
      query = "r_ave_mylist_rank";
      break;
    default:
      query = "r_ave_view_rank";
  }
  return (
    <div className="">
      <Header />
      <div className="w-full">
        <div className="grid grid-cols-12 sm:gap-8">
          <main
            className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12 mb-10"
            id="main"
          >
            <RankingSection
              pageType={{
                name: name,
                query: query,
                offset: offset,
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
