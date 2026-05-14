import { Spinner } from '@/components/common/Spinner/Spinner';

export const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[var(--surface-overlay)] backdrop-blur-sm">
      <Spinner size="xl" variant="primary" />
    </div>
  );
};
