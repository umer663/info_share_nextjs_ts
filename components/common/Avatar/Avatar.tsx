import { cn } from '@/utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = ({ src, alt, fallback, size = 'md', className, ...props }: AvatarProps) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] items-center justify-center font-semibold",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || "Avatar"}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(fallback)}</span>
      )}
    </div>
  );
};
