'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Algorithms', path: '/algorithms' },
  { name: 'Visualizer', path: '/visualizer' },
  { name: 'Compare', path: '/compare' },
  { name: 'Complexity Lab', path: '/complexity' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 font-poppins">
              Algo<span className="text-cyan-500">Vision</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative font-medium text-sm ${
                    isActive ? 'text-black font-bold' : 'text-black hover:text-blue-600'
                  } transition-colors duration-200`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center">
            {/* Start Learning button removed */}
          </div>
        </div>
      </div>
    </header>
  );
}