import { useState } from 'react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  AnnouncementBar,
  Navbar,
  Hero,
  TrustStrip,
  ProductSection,
  ProductQuickView,
  BrandStory,
  OccasionsSection,
  InstagramSection,
  WhyChooseUs,
  GiftingCallout,
  FAQ,
  Footer,
  ScrollToTop,
} from './components/Storefront';

const queryClient = new QueryClient();

function Home() {
  const [filter, setFilter] = useState('All');
  const [quickView, setQuickView] = useState(null);

  return (
    <div className="site-wrap">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ProductSection
          selectedFilter={filter}
          setSelectedFilter={setFilter}
          onOpen={setQuickView}
        />
        <BrandStory />
        <OccasionsSection onFilter={setFilter} />
        <InstagramSection />
        <WhyChooseUs />
        <GiftingCallout />
        <FAQ />
      </main>
      <Footer onFilter={setFilter} />
      <ScrollToTop />
      {quickView && (
        <ProductQuickView
          product={quickView}
          onClose={() => setQuickView(null)}
        />
      )}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  const baseUrl = (import.meta.env.BASE_URL || '').replace(/\/$/, '');
  return (
    <MotionConfig reducedMotion="never">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={baseUrl}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </MotionConfig>
  );
}

export default App;
