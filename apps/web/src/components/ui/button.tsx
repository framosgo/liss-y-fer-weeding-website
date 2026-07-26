import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burdeos/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-burdeos/90 text-white shadow-bloom hover:bg-burdeos-hover',
        secondary: 'bg-terracotta text-white hover:bg-terracotta/90',
        outline:
          'border border-burdeos/25 bg-white/75 text-burdeos hover:bg-burdeos/10 dark:bg-white/10 dark:text-white',
        ghost: 'text-burdeos hover:bg-burdeos/10 dark:text-white dark:hover:bg-white/10'
      },
      size: {
        default: 'h-11',
        sm: 'h-9 px-4',
        lg: 'h-12 px-7 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';
