'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type Props = {
  header: ReactNode;
  footer: ReactNode;
  stickyBar: ReactNode;
  popup: ReactNode;
  children: ReactNode;
};

export default function SiteChrome({ header, footer, stickyBar, popup, children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;

  if (isAdmin) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      {header}
      <main id="main">{children}</main>
      {footer}
      {stickyBar}
      {popup}
    </>
  );
}
