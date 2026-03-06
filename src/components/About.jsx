import React from 'react'
import { siteContent } from '../data/site'

export default function About({ lang }) {
  const content = siteContent[lang] || siteContent.en

  return (
    <section id="about" className="section about">
      <div className="container grid-2">
        <div>
          <p className="eyebrow">{content.about.eyebrow}</p>
          <h2>{content.about.title}</h2>
          <p>{content.about.text}</p>
          <ul className="checks">
            {content.about.points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <div className="stats">
          {content.about.stats.map(item => (
            <div key={item.label}>
              <span>{item.value}</span>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
