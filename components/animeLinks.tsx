import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomLink from "./link";

const AnimeLinks = ({
  links,
  className,
}: {
  links: {
    key: string;
    url: string;
  }[];
  className?: string;
}) => {
  return (
    <Card className={className}>
      <div className="p-6 flex flex-col gap-6">
        {links.map((link, i) => (
          <CustomLink href={link.url} className="flex flex-col gap-0" key={i}>
            <p>{link.key}</p>
            <p className=" text-blue-500 mx-3 break-words">{link.url}</p>
          </CustomLink>
        ))}
      </div>
    </Card>
  );
};

export default AnimeLinks;
