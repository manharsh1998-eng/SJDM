import React, { useState, useEffect } from 'react'
import { siteContent } from '../data/site'
import logo from '../assets/logo-sjdm.svg'

export default function Navbar({ lang, setLang }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const content = siteContent[lang] || siteContent.en

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="brand" aria-label="SJDM Constructions home">
          <img src={logo} width="270" height="58" alt="SJDM Constructions and Services Pvt Ltd" />
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          onClick={() => setOpen(value => !value)}
          aria-label="Toggle navigation"
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`nav__menu ${open ? 'is-open' : ''}`} aria-label="Primary">
          {content.nav.map(item => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <div className="lang-switch nav__lang-mobile" role="group" aria-label="Language switcher">
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'pa' ? 'is-active' : ''}`}
              onClick={() => setLang('pa')}
            >
              ਪੰਜਾਬੀ
            </button>
          </div>
        </nav>

        <div className="nav__actions">
          <div className="lang-switch" role="group" aria-label="Language switcher">
            <button
              type="button"
              className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === 'pa' ? 'is-active' : ''}`}
              onClick={() => setLang('pa')}
            >
              ਪੰਜਾਬੀ
            </button>
          </div>
          <a className="btn btn--primary nav__cta" href="#contact">{content.navbarCta}</a>
        </div>
      </div>
    </header>
  )
}
