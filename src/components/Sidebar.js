"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Kezdőlap", href: "/" },
    { name: "Kvízek", href: "/PlayQuiz" },
    { name: "Kvíz készítése", href: "/CreateQuiz" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-screen sticky top-0 transition-all duration-300">
      <div className="p-6">
        <h2 className="text-xl font-bold text-black dark:text-white mb-8">Kvíz App</h2>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
