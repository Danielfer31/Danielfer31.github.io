import { CaseStudy } from "./CaseStudy";
import { ChapterScroller } from "./ChapterScroller";
import { CookieBanner } from "./CookieBanner";
import { DemoForm } from "./DemoForm";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Partners } from "./Partners";
import { RotateNotice } from "./RotateNotice";
import { Stats } from "./Stats";

export function LandingPage() {
  return (
    <>
      <Header />
      <main id="main">
        <ChapterScroller />
        <Partners />
        <Stats />
        <CaseStudy />
        <DemoForm />
      </main>
      <Footer />
      <CookieBanner />
      <RotateNotice />
    </>
  );
}
