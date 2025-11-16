import type { ReactNode } from 'react';

type TypographyProps = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'paragraph'
    | 'small'
    | 'lead';
  className?: string;
  children: ReactNode;
  as?: any;
  href?: string;
};

export function Typography({
  variant = 'paragraph',
  className = '',
  children,
  as,
  href,
}: TypographyProps) {
  const _Component = as || variant;

  const variantClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    paragraph: 'text-base',
    small: 'text-sm',
    lead: 'text-lg',
  };

  const finalClassName = `${variantClasses[variant]} ${className}`;

  if (as === 'a') {
    return (
      <a className={finalClassName} href={href}>
        {children}
      </a>
    );
  }

  if (variant === 'h1') {
    return <h1 className={finalClassName}>{children}</h1>;
  }
  if (variant === 'h2') {
    return <h2 className={finalClassName}>{children}</h2>;
  }
  if (variant === 'h3') {
    return <h3 className={finalClassName}>{children}</h3>;
  }
  if (variant === 'h4') {
    return <h4 className={finalClassName}>{children}</h4>;
  }
  if (variant === 'h5') {
    return <h5 className={finalClassName}>{children}</h5>;
  }
  if (variant === 'h6') {
    return <h6 className={finalClassName}>{children}</h6>;
  }
  if (variant === 'small') {
    return <small className={finalClassName}>{children}</small>;
  }

  return <p className={finalClassName}>{children}</p>;
}
