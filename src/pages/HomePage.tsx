// Import Hero component for the main landing section
import { Hero } from "../components/Hero";
// Import About component for company information section
import { About } from "../components/About";
// Import Courses component for courses overview section
import { Courses } from "../components/Courses";
// Import StudentJourney component for learning path visualization
import { StudentJourney } from "../components/StudentJourney";
// Import Testimonials component for student reviews section
import { Testimonials } from "../components/Testimonials";
import { PlacementsSection } from "../components/PlacementsSection";
// Import CTABanner component for call-to-action section
import { CTABanner } from "../components/CTABanner";
// Import RecognitionLogos component for government recognition section
import RecognitionLogos  from "../components/RecognitionLogos"; // ✅ Naya component add kiya
// Import CSS module styles specific to HomePage
import styles from "./HomePage.module.css";

// Define props interface for HomePage component
interface HomePageProps {
  onNavigate?: (page: string) => void; // Optional navigation function to switch between pages
}

// HomePage component that renders the main landing page layout
export function HomePage({ onNavigate }: HomePageProps) {
  // Return main page structure with all homepage sections
  return (
    <main className={`relative overflow-hidden ${styles.homeContainer}`}> {/* Main container with relative positioning and overflow hidden */}
      <Hero onNavigate={onNavigate} /> {/* Hero section with navigation handler */}
      <About /> {/* About section describing KaushalHub */}
      <RecognitionLogos /> {/* ✅ Government recognition logos section add kiya */}
      <Courses onNavigate={onNavigate} /> {/* Courses section with navigation to courses page */}
      <StudentJourney /> {/* Student journey timeline section */}
      <Testimonials /> {/* Student testimonials and reviews section */}
      <PlacementsSection /> {/* Placement statistics and success stories section */}
      <CTABanner onNavigate={onNavigate} /> {/* Call-to-action banner with navigation */}
    </main>
  );
}