import { Link } from '@tanstack/react-router';
import { Home, Menu, X, CheckSquare } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between bg-gray-900 px-4 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 transition-colors hover:bg-gray-800"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">TanStack + NestJS</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-gray-300 transition-colors hover:text-white"
            activeProps={{ className: 'text-white font-medium' }}
          >
            Home
          </Link>
          <Link
            to="/tasks"
            className="text-gray-300 transition-colors hover:text-white"
            activeProps={{ className: 'text-white font-medium' }}
          >
            Tasks
          </Link>
        </nav>
      </header>

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-80 transform flex-col bg-gray-900 text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 transition-colors hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="mb-2 flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-800"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/tasks"
            onClick={() => setIsOpen(false)}
            className="mb-2 flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-800"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <CheckSquare size={20} />
            <span className="font-medium">Tasks</span>
          </Link>
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
