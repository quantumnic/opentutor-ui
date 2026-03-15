'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, RefreshCw, BarChart3, GraduationCap } from 'lucide-react';

const items = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/subjects', label: 'Subjects', icon: BookOpen },
  { href: '/review', label: 'Review', icon: RefreshCw },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 bottom-0 bg-card border-r border-border p-4 pt-6">
      <Link href="/" className="flex items-center gap-2 mb-8 px-3">
        <GraduationCap className="w-8 h-8 text-accent" />
        <span className="text-xl font-bold text-text">opentutor</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              pathname === href
                ? 'bg-accent/15 text-accent'
                : 'text-muted hover:text-text hover:bg-bg'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
