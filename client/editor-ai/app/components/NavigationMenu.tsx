import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Navigation: React.FC = () => {
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <nav>
      <ul className="list-none text-right font-poppins mt-5 ml-auto">
        {[
          { href: "/pages/homepage", label: "Home Page" },
          { href: "/pages/texteditor", label: "Text Editor" },
          { href: "/pages/profile", label: "Profile" }
        ].map(link => (
          <li key={link.href} className="inline-block">
            <Link href={link.href} legacyBehavior={true}>
              <a className={`block px-5 py-2 text-gray-800 hover:text-red-800 ${isActive(link.href) ? 'text-red-500 border-t-2 border-red-500' : ''}`}>
                {link.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
