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
  let params: [string, string][] = [];
  switch (type) {
    case "再生数":
      params.push(["name", "再生数"]);
      break;
    case "マイリスト数":
      params.push(["name", "マイリスト数"]);
      break;
    case "コメント数":
      params.push(["name", "コメント数"]);
      break;
  }
  return (
    <Pagination>
      {nextOffset - previouseOffset > rankingCardSize && (
        <PaginationPrevious
          href={
            "/previous?" +
            new URLSearchParams([
              ...params,
              ["offset", String(previouseOffset).toString()],
            ])
          }
        />
      )}
      <PaginationContent>
        {Array.from(
          { length: Math.ceil(numCh / rankingCardSize) },
          (_, i) => i
        ).map((i) => (
          <PaginationLink
            key={i}
            href={
              "/previous?" +
              new URLSearchParams([
                ...params,
                ["offset", String(i * rankingCardSize).toString()],
              ])
            }
            isActive={nextOffset / rankingCardSize == i + 1}
          >
            {i + 1}
          </PaginationLink>
        ))}
      </PaginationContent>
      {numCh > nextOffset && (
        <PaginationNext
          href={
            "/previous?" +
            new URLSearchParams([
              ...params,
              ["offset", String(nextOffset).toString()],
            ])
          }
        />
      )}
    </Pagination>
  );
};

export default PreviRankingPagination;
