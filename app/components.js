"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardCheck,
  LayoutDashboard,
  FileWarning,
  FlaskConical,
} from "lucide-react";

export function Shell({ children, eyebrow, title, subtitle, actions }) {
  const path = usePathname();
  const nav = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/audit", label: "Audit", icon: ClipboardCheck },
    { href: "/capa/2", label: "CAPA", icon: FileWarning },
  ];
  return (
    <div className="site-shell">
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="brand-mark">
            <FlaskConical size={22} />
          </span>
          <span>
            <strong>LABORATORY QUALITY</strong>
            <small>THINKING MODEL (LQTM)</small>
          </span>
        </Link>
        <nav>
          <p className="nav-label">Workspace</p>
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/"
                ? path === "/" || path === "/dashboard"
                : path.startsWith(href.split("/").slice(0, 2).join("/"));
            return (
              <Link
                key={href}
                href={href}
                className={active ? "nav-item active" : "nav-item"}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="audit-card">
          <span className="live-dot" />
          <div>
            <strong>Internal audit</strong>
            <small>Draft · Jul 2026</small>
          </div>
        </div>
      </aside>
      <main>
        <header className="page-header">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {actions && <div className="header-actions">{actions}</div>}
        </header>
        {children}
      </main>
    </div>
  );
}

export function StatusPill({ status }) {
  return (
    <span
      className={`status-pill ${status.toLowerCase().replaceAll(" ", "-")}`}
    >
      {status}
    </span>
  );
}
