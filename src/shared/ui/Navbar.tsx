import { Typography } from './Typography';

export type NavbarProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Navbar({
  title = 'App',
  children,
  className = '',
}: NavbarProps) {
  return (
    <nav className={`bg-white shadow-md ${className}`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Typography className="mr-4 cursor-pointer py-1.5" variant="h6">
          {title}
        </Typography>
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </nav>
  );
}
