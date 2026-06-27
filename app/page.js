import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import Categories from '@/components/Categories'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <Categories />
      <Footer />
    </main>
  )
}
