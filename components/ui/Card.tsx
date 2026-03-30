import type { ComponentPropsWithoutRef } from 'react';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  hover?: boolean;
  padding?: 'default' | 'compact' | 'loose' | 'none';
}

const paddingClasses = {
  default: 'p-8',
  compact: 'p-6',
  loose: 'p-10',
  none: '',
};

export function Card({
  hover = true,
  padding = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'bg-white border border-neutral-200 rounded-[16px]',
        'shadow-[0_8px_24px_rgba(22,62,116,0.06)]',
        'transition-all duration-[180ms] ease-[ease]',
        hover
          ? 'hover:shadow-[0_12px_32px_rgba(22,62,116,0.10)] hover:-translate-y-0.5'
          : '',
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
