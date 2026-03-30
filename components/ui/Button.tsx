import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ComponentPropsWithoutRef<'button'> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsLink = BaseProps & {
  as: 'link';
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-brand-700 text-white border border-transparent',
    'hover:bg-brand-900',
    'focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2',
  ].join(' '),
  secondary: [
    'bg-white text-brand-700 border border-brand-700',
    'hover:bg-brand-100',
    'focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-[22px] py-[14px] text-body-sm',
  lg: 'px-7 py-4 text-body-sm',
};

function buildClassName(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  extra?: string
): string {
  return [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-[10px]',
    'transition-all duration-[180ms] ease-[ease]',
    'cursor-pointer whitespace-nowrap',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    extra,
  ]
    .filter(Boolean)
    .join(' ');
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className } = props;
  const classes = buildClassName(variant, size, className);

  if (props.as === 'link') {
    const { href, children, target, rel } = props;
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const { as: _as, href: _href, ...buttonProps } = props as ButtonAsButton & {
    as?: string;
    href?: string;
  };

  return (
    <button {...(buttonProps as ComponentPropsWithoutRef<'button'>)} className={classes} />
  );
}
