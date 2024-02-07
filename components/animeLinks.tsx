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
  channelLink,
  twitterLink,
  homePageLink,
  className,
}: {
  channelLink: string;
  twitterLink: string;
  homePageLink: string;
  className?: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CustomLink href={channelLink} className="flex flex-col gap-0">
          <p>ニコニコチャンネル:</p>
          <p className=" text-blue-500 mx-3 break-words">{channelLink}</p>
        </CustomLink>
      </CardHeader>
      <CardContent>
        <CustomLink href={twitterLink} className="flex flex-col gap-0">
          <p>公式Twitter(X):</p>
          <p className=" text-blue-500 mx-3 break-words">{twitterLink}</p>
        </CustomLink>
      </CardContent>
      <CardFooter>
        <CustomLink href={homePageLink} className="flex flex-col gap-0">
          <p>公式ホームページ:</p>
          <p className=" text-blue-500 mx-3  break-words">{homePageLink}</p>
        </CustomLink>
      </CardFooter>
    </Card>
  );
};

export default AnimeLinks;
