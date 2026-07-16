import { HeroSection } from '../components/HeroSection'
import { AboutSection } from '../components/AboutSection'
import { OperationSection } from '../components/OperationSection'
import { Features } from '../components/Features'

export function LandingPage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <OperationSection />
      <Features />
    </main>
  )
}
