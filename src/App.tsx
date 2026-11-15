import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { MultiCounter } from "./components/MultiCounter";
import { Repairs } from "./components/Repairs";
import { Pricing } from "./components/Pricing";
import { Videos } from "./components/Videos";
import { DownloadCta } from "./components/DownloadCta";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { useLatestRelease } from "./lib/useLatestRelease";

export default function App() {
  const release = useLatestRelease();
  return (
    <>
      <Nav />
      <main>
        <Hero release={release} />
        <Features />
        <MultiCounter />
        <Repairs />
        <Pricing />
        <Videos />
        <DownloadCta release={release} />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
