"use client";

import { useState } from "react";
import Link from "./link";
import headerNavLinks from "@/data/headerNavLinks";

const MobileNav = () => {
  const [navshow, setNavshow] = useState(false);

  const onToggleNav = () => {
    setNavshow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // スクロール禁止
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="md:hidden"
      >
        <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM20 16H4V18H20V16Z"
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full bg-gray-950 opacity-[0.98] duration-300 ease-in-out ${
          navshow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            className="mr-8 mt-11 h-8 w-8"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-7">
              <Link
                href={link.href}
                className="text-2xl tracking-widest text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
