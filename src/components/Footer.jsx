import React from 'react'
import { siteContent } from '../data/site'
import logo from '../assets/logo-sjdm.svg'

export default function Footer({ lang }) {
  const year = new Date().getFullYear()
  const content = siteContent[lang] || siteContent.en

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={logo} width="290" height="62" alt="SJDM Constructions and Services Pvt Ltd" />
          <p>{content.footer.tagline}</p>
        </div>
        <nav className="footer__nav">
          {content.nav.map(item => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="footer__meta">
          <p>© {year} {content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
