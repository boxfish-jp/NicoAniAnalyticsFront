import { Button } from "@/components/ui/button";
import CustomLink from "@/components/link";

const ButtonLists = ({
  links,
}: {
  links: { name: string; href: string }[];
}) => (
  <section className="flex flex-row gap-3 md:gap-12 mx-auto">
    {links.map((link, i) => (
      <CustomLink href={link.href} key={i}>
        <Button>{link.name}</Button>
      </CustomLink>
    ))}
  </section>
);

export default ButtonLists;
