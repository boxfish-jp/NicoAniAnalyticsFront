import Link from "next/link";
import type { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

const CustomLink = ({
  href,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const url: string = href;
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return <Link href={url} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={url} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
