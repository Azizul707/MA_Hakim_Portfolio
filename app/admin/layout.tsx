"use client";

import { ReactNode, useState } from "react";
import { ThemeProvider } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar, MobileSidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AdminShell>{children}</AdminShell>
    </ThemeProvider>
  );
}

function AdminShell({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-over drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="fixed inset-y-0 left-0 z-50 lg:hidden"
          >
            <MobileSidebar onClose={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex min-h-screen flex-col lg:ml-[245px]">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-6 py-6 lg:px-8 lg:py-8">{children}</main>

        {/* Subtle footer for desktop */}
        <footer className="hidden border-t border-border px-6 py-3 text-[11px] text-muted-foreground/30 lg:block">
          MA Hakim CRM — v1.0
        </footer>
      </div>
    </div>
  );
}
