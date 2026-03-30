import type { ComponentPropsWithoutRef, ElementType } from 'react';

type ContainerVariant = 'page' | 'content' | 'text' | 'form';

const variantClasses: Record<ContainerVariant, string> = {
  page: 'max-w-[1280px]',
  content: 'max-w-[1120px]',
  text: 'max-w-[760px]',
  form: 'max-w-[640px]',
};

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  variant?: ContainerVariant;
  as?: ElementType;
  noPadding?: boolean;
}

export function Container({
  variant = 'content',
  as: Tag = 'div',
  noPadding = false,
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={[
        'w-full mx-auto',
        noPadding ? '' : 'px-4 sm:px-6 lg:px-8',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
