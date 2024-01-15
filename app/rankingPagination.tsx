import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CustomLink from "@/components/link";

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
        {Array.from({ length: Math.ceil(numCh / 10) }, (_, i) => i).map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={"/?offset=" + i * 10}
              isActive={nextOffset / 10 == i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      {numCh > nextOffset && <PaginationNext href={"/?offset=" + nextOffset} />}
    </Pagination>
  );
};

export default RankingPagination;
