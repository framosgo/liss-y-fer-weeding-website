import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { StoryPage } from '@/pages/StoryPage';
import { ProgramPage } from '@/pages/ProgramPage';
import { VenuePage } from '@/pages/VenuePage';
import { TravelPage } from '@/pages/TravelPage';
import { RsvpPage } from '@/pages/RsvpPage';
import { DressCodePage } from '@/pages/DressCodePage';
import { GiftsPage } from '@/pages/GiftsPage';
import { FaqPage } from '@/pages/FaqPage';
import { AdminPage } from '@/pages/AdminPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/historia" element={<StoryPage />} />
        <Route path="/programa" element={<ProgramPage />} />
        <Route path="/lugar" element={<VenuePage />} />
        <Route path="/viaje" element={<TravelPage />} />
        <Route path="/rsvp" element={<RsvpPage />} />
        <Route path="/dress-code" element={<DressCodePage />} />
        <Route path="/regalos" element={<GiftsPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
    </>
  );
}
