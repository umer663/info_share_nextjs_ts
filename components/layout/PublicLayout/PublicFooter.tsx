import Link from 'next/link';

export const PublicFooter = () => {
  return (
    <footer className="border-t border-[var(--color-neutral-200)] bg-[var(--surface-primary)] py-[var(--space-10)]">
      <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
        <div className="grid grid-cols-1 gap-[var(--space-8)] md:grid-cols-4">
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-[var(--space-4)]">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-primary-600)] text-white font-bold text-xs">
                I
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
                Info Share
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-sm">
              Share knowledge and empower everyone. Join our community to get access to premium insights and resources.
            </p>
          </div>
          
          <div className="flex flex-col space-y-[var(--space-4)]">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Links</h3>
            <ul className="flex flex-col space-y-[var(--space-2)]">
              <li><Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">About Us</Link></li>
              <li><Link href="/content" className="text-sm text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">Browse Content</Link></li>
              <li><Link href="/contact" className="text-sm text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col space-y-[var(--space-4)]">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Legal</h3>
            <ul className="flex flex-col space-y-[var(--space-2)]">
              <li><Link href="/terms" className="text-sm text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-[var(--space-8)] border-t border-[var(--color-neutral-200)] pt-[var(--space-6)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Info Share. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
