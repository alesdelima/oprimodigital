"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, whatsappHref } from "@/lib/content";
import { Wordmark } from "./Wordmark";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#top" aria-label="O Primo Digital — início">
          <Wordmark className="text-sm sm:text-base" />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button
            variant="outline"
            nativeButton={false}
            className="glow-btn border-primary/70 bg-transparent text-foreground hover:bg-primary/10"
            render={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" />}
          >
            Solicitar orçamento
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-11 lg:hidden"
                aria-label="Abrir menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-border bg-background sm:max-w-sm"
          >
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            <div className="flex h-full flex-col justify-between px-6 py-10">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link
                          href={link.href}
                          className="font-display text-2xl text-foreground transition-colors hover:text-primary"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <Button
                className="glow-btn h-12 border border-primary/70 bg-transparent text-base text-foreground hover:bg-primary/10"
                variant="outline"
                nativeButton={false}
                render={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" />}
              >
                Solicitar orçamento
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
