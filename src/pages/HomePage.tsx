import { Header } from '../components/home/Header';
import { HeroSection } from '../components/home/HeroSection';
import { FeatureCards } from '../components/home/FeatureCards';
import { ActivityFlow } from '../components/home/ActivityFlow';
import { TrainingPreview } from '../components/home/TrainingPreview';
import { LeafGalleryPreview } from '../components/home/LeafGalleryPreview';
import { MascotIntro } from '../components/home/MascotIntro';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { Footer } from '../components/home/Footer';

interface HomePageProps {
  onStartTraining: () => void;
  onRestoreTraining: (sessionId: string) => void;
}

export function HomePage({ onStartTraining, onRestoreTraining }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white animate-[fadeIn_0.5s_ease-out]">
      <Header onStartTraining={onStartTraining} />
      <HeroSection onStartTraining={onStartTraining} onRestoreTraining={() => onRestoreTraining('')} />
      <FeatureCards />
      <ActivityFlow />
      <TrainingPreview />
      <LeafGalleryPreview />
      <MascotIntro />
      <TestimonialSection />
      <Footer />
    </div>
  );
}
