import React from 'react'
import { siteContent, testimonials } from '../data/site'

export default function Testimonials({ lang }) {
  const content = siteContent[lang] || siteContent.en

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <h2>{content.testimonials.title}</h2>
        <div className="testimonials">
          {testimonials.map(item => (
            <figure key={item.name.en} className="quote">
              <blockquote>“{item.quote[lang]}”</blockquote>
              <figcaption>
                <strong>{item.name[lang]}</strong>
                <span>{item.role[lang]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
