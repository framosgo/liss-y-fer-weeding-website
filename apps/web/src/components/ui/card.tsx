import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-olive/15 bg-white/78 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/8',
        className,
      )}
      {...props}
    />
  );
}
