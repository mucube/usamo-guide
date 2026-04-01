import React from 'react';

export const GlowingRing = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => (
  <div className="group relative">
    <div className="absolute -inset-2 rounded-full bg-linear-to-r from-orange-400 to-amber-600 opacity-20 blur-xl transition duration-1000 group-hover:opacity-40 dark:-inset-3 dark:opacity-35 dark:group-hover:opacity-60" />
    {children}
  </div>
);
