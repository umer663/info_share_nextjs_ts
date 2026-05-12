"use client";

import React from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Palette } from "lucide-react";

const themes = [
  { id: "default", name: "Default Blue", color: "#3b82f6" },
  { id: "amethyst", name: "Amethyst Purple", color: "#a855f7" },
  { id: "emerald", name: "Emerald Green", color: "#10b981" },
  { id: "sunset", name: "Sunset Orange", color: "#ed8936" },
] as const;

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Palette className="w-4 h-4 text-[var(--text-secondary)]" />
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="bg-transparent text-sm font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer border border-[var(--color-neutral-200)] rounded-md px-2 py-1 hover:border-[var(--color-primary-500)] transition-colors"
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id} className="text-black">
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
};
