import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "../components/hero-section";
import { FaqSection } from "../components/faq-section";
import { TestimonialsSection } from "../components/testimonials-section";
import { GitHubSection } from "../components/github-section";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="">
   
      <HeroSection />
      <FaqSection />
      <TestimonialsSection />
      <GitHubSection />
    </div>
  );
}
