"use client";
import { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { Avatar } from '@/components/common/Avatar/Avatar';
import { ThemeSelector } from '@/components/common/ThemeSelector/ThemeSelector';

export const TopBar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] flex h-[var(--header-height)] w-full items-center justify-between border-b border-[var(--color-neutral-200)] bg-[var(--surface-primary)] px-[var(--space-4)] md:px-[var(--space-8)]">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button 
          onClick={onMenuClick}
          className="mr-4 md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-[var(--space-3)] h-4 w-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-[var(--radius-md)] border border-[var(--color-neutral-200)] bg-[var(--surface-secondary)] pl-[calc(var(--space-3)*2+1rem)] pr-[var(--space-3)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
          />
        </div>
      </div>

      <div className="flex items-center space-x-[var(--space-4)]">
        <ThemeSelector />
        
        <button className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--color-error)] border-2 border-[var(--surface-primary)]"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-4 border-l border-[var(--color-neutral-200)]">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Admin User</span>
            <span className="text-xs text-[var(--text-muted)]">Administrator</span>
          </div>
          <Avatar fallback="Admin User" size="md" />
        </div>
      </div>
    </header>
  );
};
