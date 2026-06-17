import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import AmbientAudioPlayer from './components/AmbientAudioPlayer';

const Home = lazy(() => import('./pages/Home'));
const Framework = lazy(() => import('./pages/Framework'));
const Pillars = lazy(() => import('./pages/Pillars'));
const Portals = lazy(() => import('./pages/Portals'));
const Ravenstar = lazy(() => import('./pages/Ravenstar'));
const PhoenixPrinciple = lazy(() => import('./pages/PhoenixPrinciple'));
const RhythmicWeave = lazy(() => import('./pages/RhythmicWeave'));
const ResonanceGarden = lazy(() => import('./pages/ResonanceGarden'));
const MUSEschool = lazy(() => import('./pages/MUSEschool'));
const Community = lazy(() => import('./pages/Community'));
const Resources = lazy(() => import('./pages/Resources'));
const Codex = lazy(() => import('./pages/Codex'));
const MediaGallery = lazy(() => import('./pages/MediaGallery'));
const JoinResonance = lazy(() => import('./pages/JoinResonance'));
const Contact = lazy(() => import('./pages/Contact'));
const SeedMembership = lazy(() => import('./pages/SeedMembership'));
const MyceliumMembership = lazy(() => import('./pages/MyceliumMembership'));

function App() {
  const location = useLocation();

  return (
    <Layout>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/framework" element={<Framework />} />
            <Route path="/pillars" element={<Pillars />} />
            <Route path="/portals" element={<Portals />} />
            <Route path="/ravenstar" element={<Ravenstar />} />
            <Route path="/phoenix" element={<PhoenixPrinciple />} />
            <Route path="/rhythmic-weave" element={<RhythmicWeave />} />
            <Route path="/garden" element={<ResonanceGarden />} />
            <Route path="/museschool" element={<MUSEschool />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/codex" element={<Codex />} />
            <Route path="/gallery" element={<MediaGallery />} />
            <Route path="/join" element={<JoinResonance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/seed-membership" element={<SeedMembership />} />
            <Route path="/mycelium-membership" element={<MyceliumMembership />} />
            {/* Legacy/alternate paths kept alive so old published links do not break */}
            <Route path="/media-gallery" element={<Navigate to="/gallery" replace />} />
            <Route path="/explore" element={<Navigate to="/gallery" replace />} />
            <Route path="/join-the-resonance" element={<Navigate to="/join" replace />} />
            <Route path="/seed" element={<Navigate to="/seed-membership" replace />} />
            <Route path="/mycelium" element={<Navigate to="/mycelium-membership" replace />} />
            <Route path="/phoenix-principle" element={<Navigate to="/phoenix" replace />} />
            <Route path="/resonance-garden" element={<Navigate to="/garden" replace />} />
            <Route path="/muse-school" element={<Navigate to="/museschool" replace />} />
            <Route path="/the-rhythmic-weave" element={<Navigate to="/rhythmic-weave" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Layout>
  );
}
<AmbientAudioPlayer />
export default App;
