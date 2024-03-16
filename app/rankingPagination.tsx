import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import rankingCardSize from "@/data/rankingCardSize";

const RankingPagination = ({
  type,
  previouseOffset,
  nextOffset,
  numCh,
}: {
  type: string;
  previouseOffset: number;
  nextOffset: number;
  numCh: number;
}) => {
  let pagetype = "";
  switch (type) {
    case "再生数":
      pagetype = "/?name=再生数";
      break;
    case "マイリスト数":
      pagetype = "/?name=マイリスト数";
      break;
    case "コメント数":
      pagetype = "/?name=コメント数";
      break;
  }
  return (
    <Pagination>
      {previouseOffset != 0 && (
        <PaginationPrevious href={pagetype + "&offset=" + previouseOffset} />
      )}
      <PaginationContent>
        {Array.from(
          { length: Math.ceil(numCh / rankingCardSize) },
          (_, i) => i
        ).map((i) => (
          <PaginationLink
            key={i}
            href={pagetype + "&offset=" + i * rankingCardSize}
            isActive={nextOffset / rankingCardSize == i + 1}
          >
            {i + 1}
          </PaginationLink>
        ))}
      </PaginationContent>
      {numCh > nextOffset && (
        <PaginationNext href={pagetype + "/?offset=" + nextOffset} />
      )}
    </Pagination>
  );
};

export default RankingPagination;
