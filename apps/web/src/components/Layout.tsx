import { Outlet } from 'react-router-dom';
import { Nav } from '@/components/sections/Nav';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex flex-1 flex-col pt-16">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <footer className="bg-[#767258] py-10 text-center text-sm text-white/75">
        Liss y Fer | Casa Gumira | 16 octubre 2026
      </footer>
    </div>
  );
}
