"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

const MobileNav = () => {
  const pathname = usePathname();
  const [navBarOpen, setNavBarOpen] = useState(false);

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/hattu.png"
          alt="menu"
          width={32}
          height={32}
          className="cursor-pointer"
        />
        <h1>TAITURIT-TEST</h1>
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger onClick={() => setNavBarOpen(true)}>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image src="/hattu.png" alt="logo" width={60} height={23} />
                  <h2>TAITURIT-TEST</h2>
                </div>
                <ul className="header-nav_elements">
                  {navLinks.slice(0, 7).map((link) => {
                    const isActiveRoute = link.route === pathname;

                    return (
                      <li
                        key={link.route}
                        className={`${
                          isActiveRoute && "gradient-text"
                        } p-18 flex whitespace-nowrap text-dark-700`}
                      >
                        <Link
                          className="sidebar-link cursor-pointer"
                          href={link.route}
                        >
                          <SheetClose>
                            <Image
                              src={link.icon}
                              alt="logo"
                              width={24}
                              height={24}
                            />
                          </SheetClose>
                          <SheetClose>{link.label}</SheetClose>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
