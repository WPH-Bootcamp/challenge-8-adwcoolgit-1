import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        // ── App variants (Figma design system) ──
        primary: 'bg-brand text-neutral-25 hover:bg-brand-hover',
        outline:
          'border border-neutral-800 text-neutral-25 hover:bg-neutral-800',
        ghost: 'text-neutral-500 hover:text-neutral-25',
        // ── shadcn defaults (kept for compatibility) ──
        default:
          'rounded-md bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary:
          'rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        // ── App sizes ──
        sm: 'h-11 rounded-full px-6 text-sm font-semibold',
        lg: 'h-13 rounded-full px-8 text-base font-semibold',
        'icon-sm': 'size-11 rounded-full',
        'icon-md': 'size-13 rounded-full',
        // ── shadcn defaults ──
        default: 'h-10 rounded-md px-4 py-2 text-sm',
        icon: 'h-10 w-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
