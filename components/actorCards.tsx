import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomLink from "./link";

const ActorCards = ({
  casts,
}: {
  casts: {
    actor: string;
    actorImg: string;
    actorWiki: string;
    character: string;
    characterImg: string;
  }[];
}) => (
  <Card>
    <CardHeader>
      <CardTitle>声優一覧</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {casts.map((cast, index) => (
        <Card key={index}>
          <CardHeader>
            {cast.actorWiki != "" ? (
              <CustomLink
                href={cast.actorWiki}
                className="text-bold text-blue-500"
              >
                {cast.actor}
              </CustomLink>
            ) : (
              <p className="text-bold">{cast.actor}</p>
            )}
            <CardDescription>{cast.character}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </CardContent>
  </Card>
);

export default ActorCards;
