import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import rankingCardSize from "@/data/rankingCardSize";

const RankingPagination = ({
  previouseOffset,
  nextOffset,
  numCh,
}: {
  previouseOffset: number;
  nextOffset: number;
  numCh: number;
}) => {
  return (
    <Pagination>
      {previouseOffset != 0 && (
        <PaginationPrevious href={"/?offset=" + previouseOffset} />
      )}
      <PaginationContent>
        {Array.from(
          { length: Math.ceil(numCh / rankingCardSize) },
          (_, i) => i
        ).map((i) => (
          <PaginationLink
            key={i}
            href={"/?offset=" + i * 10}
            isActive={nextOffset / rankingCardSize == i + 1}
          >
            {i + 1}
          </PaginationLink>
        ))}
      </PaginationContent>
      {numCh > nextOffset && <PaginationNext href={"/?offset=" + nextOffset} />}
    </Pagination>
  );
};

export default RankingPagination;
