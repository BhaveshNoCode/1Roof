import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import Features from '@/components/Features'
import Categories from '@/components/Categories'
import BrandStatement from '@/components/BrandStatement'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <Features />
      <Categories />
      <BrandStatement />
      <Testimonials />
      <Footer />
    </main>
  )
}
