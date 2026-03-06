import React from 'react'
import { siteContent, services } from '../data/site'

export default function Services({ lang }) {
  const content = siteContent[lang] || siteContent.en

  return (
    <section id="services" className="section">
      <div className="container">
        <h2>{content.services.title}</h2>
        <p className="section__lede">{content.services.lede}</p>
        <div className="cards">
          {services.map(service => (
            <article key={service.title.en} className="card">
              <div className="card__icon" aria-hidden="true">{service.icon}</div>
              <h3>{service.title[lang]}</h3>
              <p>{service.desc[lang]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
