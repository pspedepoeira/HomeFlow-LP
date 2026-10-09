import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import PainSection from '../components/PainSection'
import SolutionSection from '../components/SolutionSection'
import BlocksSection from '../components/BlocksSection'
import HowItWorks from '../components/HowItWorks'
import TrustSection from '../components/TrustSection'
import Urgency from '../components/Urgency'
import FAQ from '../components/FAQ'
import RegistrationForm from '../components/RegistrationForm'
import Footer from '../components/Footer'

const MINIMUM_TO_SHOW = 50

export default function Home() {
  const [counter, setCounter] = useState(null)

  async function loadCounter() {
    try {
      const r = await fetch('/api/stats')
      const j = await r.json()
      if (j.ok && j.total >= MINIMUM_TO_SHOW) setCounter(j.total)
    } catch {}
  }

  useEffect(() => {
    loadCounter()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainSection />
        <SolutionSection />
        <BlocksSection />
        <HowItWorks />
        <TrustSection />
        <Urgency counter={counter} />
        <FAQ />
        <RegistrationForm onSuccess={loadCounter} />
      </main>
      <Footer />
    </>
  )
}
