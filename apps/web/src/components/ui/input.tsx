import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-12 w-full rounded-md border border-burgundy/15 bg-white/85 px-4 text-base text-burgundy shadow-sm outline-none transition placeholder:text-burgundy/40 focus:border-mustard focus:ring-2 focus:ring-mustard/30 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';
