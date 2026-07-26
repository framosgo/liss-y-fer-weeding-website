import { Outlet } from 'react-router-dom';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex flex-1 flex-col pt-16">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
