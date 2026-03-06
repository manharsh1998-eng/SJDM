import React from 'react'
import { siteContent } from '../data/site'

export default function Clients({ lang }) {
  const content = siteContent[lang] || siteContent.en

  return (
    <section className="section clients" id="clients">
      <div className="container">
        <p className="eyebrow">{content.clients.eyebrow}</p>
        <h2>{content.clients.title}</h2>
        <div className="clients__grid" role="list" aria-label="Key clients">
          {content.clients.cards.map(card => (
            <article key={card.title} className="client" role="listitem">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
