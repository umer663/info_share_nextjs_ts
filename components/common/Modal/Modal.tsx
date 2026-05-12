"use client";
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { fadeSlideUp } from '@/utils/animationVariants';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--surface-overlay)] backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "w-full max-w-lg rounded-[var(--radius-xl)] bg-[var(--surface-primary)] shadow-[var(--shadow-2xl)] flex flex-col pointer-events-auto",
                className
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-neutral-200)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 hover:bg-[var(--color-neutral-100)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
