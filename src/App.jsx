import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Clients from './components/Clients.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Testimonials from './components/Testimonials.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    document.documentElement.lang = lang === 'pa' ? 'pa' : 'en'
    document.body.classList.toggle('lang-pa', lang === 'pa')
  }, [lang])

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Clients lang={lang} />
        <Services lang={lang} />
        <Projects lang={lang} />
        <Testimonials lang={lang} />
        <FAQ lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  )
}
