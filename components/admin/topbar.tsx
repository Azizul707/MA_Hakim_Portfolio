"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Search, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .slice(1) // skip empty and /admin itself — we hardcode it below
    .map((segment, index, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href: "/admin/" + arr.slice(0, index + 1).join("/"),
      isLast: index === arr.length - 1,
    }));

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/70 px-4 backdrop-blur-xl lg:px-6">
      {/* Left: mobile hamburger + breadcrumb */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface/80 hover:text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
          <Link
            href="/admin"
            className={cn(
              "whitespace-nowrap transition-colors",
              breadcrumbs.length === 0
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Dashboard
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
              {crumb.isLast ? (
                <span className="whitespace-nowrap font-medium text-foreground">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: actions */}
      <div className="flex flex-shrink-0 items-center gap-1.5">
        {/* Search placeholder */}
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/30 hover:bg-surface md:flex">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="hidden rounded border border-border bg-surface px-1.5 font-mono text-[10px] text-muted-foreground/50 lg:inline">
            ⌘K
          </kbd>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface/80 hover:text-foreground"
          aria-label="Toggle theme"
        >
          {mounted ? (
            <>
              <Sun
                className={cn(
                  "h-4 w-4 transition-all",
                  theme === "dark" && "hidden",
                )}
              />
              <Moon
                className={cn(
                  "h-4 w-4 transition-all",
                  theme !== "dark" && "hidden",
                )}
              />
            </>
          ) : (
            <div className="h-4 w-4" />
          )}
        </button>

        {/* User avatar + name */}
        <div className="flex items-center gap-2.5 rounded-lg px-1.5 py-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-[11px] font-semibold text-accent">
            A
          </div>
          <span className="hidden text-sm font-medium text-foreground sm:inline">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
