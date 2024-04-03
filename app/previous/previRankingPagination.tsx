import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import rankingCardSize from "@/data/rankingCardSize";

const PreviRankingPagination = ({
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
      pagetype = "/previous?name=再生数";
      break;
    case "マイリスト数":
      pagetype = "/previous?name=マイリスト数";
      break;
    case "コメント数":
      pagetype = "/previous?name=コメント数";
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
        <PaginationNext href={pagetype + "&offset=" + nextOffset} />
      )}
    </Pagination>
  );
};

export default PreviRankingPagination;
