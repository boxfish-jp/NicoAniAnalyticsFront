import Header from "@/components/header";
import RankingSection from "./rankingSect";

const Home = (props: { params: {}; searchParams: { offset?: number } }) => {
  const offset = Number(props.searchParams.offset) || 0;
  return (
    <div className="">
      <Header />
      <div className="w-full">
        <div className="grid grid-cols-12 sm:gap-8">
          <main
            className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12"
            id="main"
          >
            <RankingSection
              pageType={{ name: "再生数", query: "aveViewers", offset: offset }}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
