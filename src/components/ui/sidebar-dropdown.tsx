"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SidebarDropdownProps {
  title: string;
  links: { name: string; href: string }[];
}

export default function SidebarDropdown({ title, links }: SidebarDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left text-gray-200 hover:bg-white hover:text-black p-2 rounded-sm transition-all"
      >
        <span>{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <ul className="ml-4 mt-2 space-y-1">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="block p-2 text-sm text-gray-300 hover:bg-gray-100 hover:text-black rounded-sm"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
