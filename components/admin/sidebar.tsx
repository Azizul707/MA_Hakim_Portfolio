"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  X,
  FolderOpen,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions/auth";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users, exact: false },
  { href: "/admin/settings", label: "Settings", icon: Settings, exact: false },
];

const contentLinks = [
  { href: "/admin/content/projects", label: "Projects", icon: FolderOpen, exact: false },
  { href: "/admin/content/solutions", label: "Solution Breakdowns", icon: FileText, exact: false },
];

/* ------------------------------------------------------------------ */
/*  Shared navigation                                                  */
/* ------------------------------------------------------------------ */

function SidebarNav() {
  const pathname = usePathname();

  const isContentActive = pathname.startsWith("/admin/content");

  function NavItem({
    href,
    label,
    icon: Icon,
    exact,
  }: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    exact?: boolean;
  }) {
    const isActive = exact
      ? pathname === href
      : pathname.startsWith(href);

    return (
      <Link
        key={href}
        href={href}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-accent/10 text-foreground"
            : "text-muted-foreground hover:bg-surface/80 hover:text-foreground",
        )}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent" />
        )}
        <Icon
          className={cn(
            "h-[18px] w-[18px] flex-shrink-0 transition-colors duration-150",
            isActive
              ? "text-accent"
              : "text-muted-foreground group-hover:text-foreground",
          )}
        />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
      {navLinks.map((link) => (
        <NavItem key={link.href} {...link} />
      ))}

      {/* Content section */}
      <div className="pt-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
            isContentActive
              ? "bg-accent/10 text-foreground"
              : "text-muted-foreground",
          )}
        >
          <FolderOpen
            className={cn(
              "h-[18px] w-[18px] flex-shrink-0",
              isContentActive ? "text-accent" : "text-muted-foreground",
            )}
          />
          <span>Content</span>
        </div>

        <div className="ml-2 mt-0.5 space-y-0.5 border-l border-border pl-3">
          {contentLinks.map((link) => {
            const isChildActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150",
                  isChildActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <link.icon
                  className={cn(
                    "h-[16px] w-[16px] flex-shrink-0 transition-colors duration-150",
                    isChildActive
                      ? "text-accent"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared footer (user + logout + version)                            */
/* ------------------------------------------------------------------ */

function SidebarFooter() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="mt-auto flex-shrink-0 border-t border-border">
      {/* User info */}
      <div className="px-4 pb-2 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Admin</p>
            <p className="truncate text-[11px] text-muted-foreground">
              Administrator
            </p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-3 pb-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:bg-surface/80 hover:text-foreground"
        >
          <LogOut className="h-[18px] w-[18px]" />
          <span>Logout</span>
        </button>
      </div>

      {/* Version */}
      <div className="px-5 pb-5">
        <span className="font-mono text-[11px] text-muted-foreground/30">
          v1.0
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop sidebar — fixed, always visible ≥ lg                       */
/* ------------------------------------------------------------------ */

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[245px] flex-col border-r border-border bg-surface lg:flex">
      {/* Logo */}
      <div className="flex-shrink-0 px-5 pb-5 pt-6">
        <Link href="/admin" className="block">
          <span className="font-display text-lg font-semibold tracking-tight">
            MA <span className="text-accent">Hakim</span>
          </span>
          <p className="mt-0.5 text-[11px] font-medium uppercase leading-tight tracking-wide text-muted-foreground/60">
            Business Automation CRM
          </p>
        </Link>
      </div>

      <SidebarNav />
      <SidebarFooter />
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile sidebar — slide-over drawer                                 */
/* ------------------------------------------------------------------ */

export function MobileSidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full w-[270px] flex-col border-r border-border bg-surface">
      {/* Logo + close */}
      <div className="flex items-center justify-between pr-3">
        <div className="flex-shrink-0 px-5 pb-5 pt-6">
          <Link
            href="/admin"
            className="block"
            onClick={onClose ? () => onClose?.() : undefined}
          >
            <span className="font-display text-lg font-semibold tracking-tight">
              MA <span className="text-accent">Hakim</span>
            </span>
            <p className="mt-0.5 text-[11px] font-medium uppercase leading-tight tracking-wide text-muted-foreground/60">
              Business Automation CRM
            </p>
          </Link>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface/80 hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <SidebarNav />
      <SidebarFooter />
    </div>
  );
}
