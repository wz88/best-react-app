import type { User } from '../../entities/user/types';
import { Button } from '../../shared/ui/Button';
import { Navbar } from '../../shared/ui/Navbar';
import { Typography } from '../../shared/ui/Typography';

type NavbarWithProfileProps = {
  user?: User;
  onLogout?: () => void;
  navigationItems?: Array<{ label: string; href: string }>;
};

export function NavbarWithProfile({
  user,
  onLogout,
  navigationItems = [],
}: NavbarWithProfileProps) {
  return (
    <Navbar>
      <div className="flex items-center gap-6">
        {navigationItems.map((item, index) => (
          <Typography
            as="a"
            className="cursor-pointer text-gray-700 transition-colors hover:text-blue-500"
            href={item.href}
            key={index}
            variant="paragraph"
          >
            {item.label}
          </Typography>
        ))}
      </div>

      {user ? (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <Typography className="text-sm" variant="small">
            {user.name}
          </Typography>
          <Button onClick={onLogout} size="sm">
            Logout
          </Button>
        </div>
      ) : (
        <Button size="sm">Login</Button>
      )}
    </Navbar>
  );
}
